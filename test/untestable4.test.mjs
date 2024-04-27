import { afterEach, beforeEach, describe, test } from "vitest";
import argon2 from "@node-rs/argon2";
import 'dotenv/config'
import { PasswordService, PostgresUserDao } from "../src/testable4.ts";
import { expect } from "chai";

const addTestUserToDatabase = async (dao, passwordHash) => {
  const user = { userId: 1, passwordHash: passwordHash };
  await dao.save(user);
}

const testHasher = {
  verifySync: (hash, password) => Buffer.from(hash, 'base64').toString('ascii') == password,
  hashSync: (password) => Buffer.from(password).toString('base64'),
}

describe("Untestable 4: enterprise application", () => {
  let service;

  beforeEach(async () => {
    const pgDao = new PostgresUserDao();
    await pgDao.dropTables();
    await pgDao.createUsersTable();

    service = new PasswordService(pgDao);
  });

  afterEach(() => {
    service.users.close();
  });

  test("No user with id 1 exists in database in PostgresUserDao", async () => {
    const dao = service.users;
    const fetchedUser = await dao.getById(1);
    expect(fetchedUser).deep.equal(null);
  });

  test("Users can be saved and fetched from the database in PostgresUserDao", async () => {
    const dao = service.users;
    const userPasswordHash = argon2.hashSync("foo");
    await addTestUserToDatabase(dao, userPasswordHash);
    const fetchedUser = await dao.getById(1);
    expect(fetchedUser).deep.equal({ userId: 1, passwordHash: userPasswordHash });
  });

  test("Saving existing user updates its values in the database in PostgresUserDao", async () => {
    const dao = service.users;
    const userPasswordHash = argon2.hashSync("foo");

    await addTestUserToDatabase(dao, userPasswordHash);

    const updatedUser = { userId: 1, passwordHash: "bar" };
    await dao.save(updatedUser);

    const fetchedUser = await dao.getById(1);
    expect(fetchedUser).deep.equal(updatedUser);
  });

  test("PasswordService can change users password", async () => {
    const dao = service.users;
    const userPasswordHash = testHasher.hashSync("foo");
    await addTestUserToDatabase(dao, userPasswordHash);
    await service.changePassword(1, "foo", "bar", testHasher);

    const fetchedUser = await dao.getById(1);
    expect(fetchedUser).deep.equal({ userId: 1, passwordHash: testHasher.hashSync("bar") });
  })

  test("PasswordService does change users password if old password is wrong", async () => {
    const dao = service.users;
    const userPasswordHash = testHasher.hashSync("foo");
    await addTestUserToDatabase(dao, userPasswordHash);
    expect(async () => await service.changePassword(1, "wrongPassword", "bar", testHasher)).to.throw;
    const fetchedUser = await dao.getById(1);
    expect(fetchedUser).deep.equal({ userId: 1, passwordHash: testHasher.hashSync("foo") });
  })
});
