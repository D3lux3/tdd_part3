import { afterAll, afterEach, beforeEach, describe, test } from "vitest";
import 'dotenv/config'
import { PasswordService, postgresUserDao } from "../src/testable4.ts";

describe("Untestable 4: enterprise application", () => {
  let service;
  const daoInstance = postgresUserDao;

  beforeEach(async () => {
    await daoInstance.open();
    service = new PasswordService(daoInstance);
  });

  afterEach(() => {
    daoInstance.close();
  });

  afterAll(() => {
    service.getInstance().dropTables();
  });

  test("todo", async () => {
    // TODO: write proper tests for both PasswordService and PostgresUserDao
  });
});
