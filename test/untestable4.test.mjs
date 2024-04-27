import { afterAll, afterEach, beforeEach, describe, test } from "vitest";
import 'dotenv/config'
import { PasswordService, PostgresUserDao } from "../src/testable4.ts";

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

  test("todo", async () => {
    // TODO: write proper tests for both PasswordService and PostgresUserDao
  });
});
