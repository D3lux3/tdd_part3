import { afterAll, afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";

describe("Untestable 4: enterprise application", () => {
  let service;
  const daoInstance = UserDaoInstance;

  beforeEach(() => {
    service = new PasswordService();
  });

  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  afterAll(() => {
    service.getInstance().dropTables();
  });

  test("todo", async () => {
    // TODO: write proper tests for both PasswordService and PostgresUserDao
  });
});
