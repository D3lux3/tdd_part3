import { afterEach, beforeEach, describe, test } from "vitest";
import 'dotenv/config'
import { PasswordService, PostgresUserDao } from "../src/testable4.ts";
import { expect } from "chai";

const addTestUserToDatabase = async (dao) => {
  const user = { userId: 1, passwordHash: "foo" };
  await dao.save(user);
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
    await addTestUserToDatabase(dao);
    const fetchedUser = await dao.getById(1);
    expect(fetchedUser).deep.equal({ userId: 1, passwordHash: "foo" });
  });

  test("Saving existing user updates its values in the database in PostgresUserDao", async () => {
    const dao = service.users;
    await addTestUserToDatabase(dao);

    const updatedUser = { userId: 1, passwordHash: "bar" };
    await dao.save(updatedUser);

    const fetchedUser = await dao.getById(1);
    expect(fetchedUser).deep.equal(updatedUser);
  });
});
