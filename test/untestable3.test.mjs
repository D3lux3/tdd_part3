import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv, readFile } from "../src/testable3.ts";

const testData = ['Loid,Forger,,Male', 'Anya,Forger,6,Female', 'Yor,Forger,27,Female'];

describe("Untestable 3: CSV file parsing", () => {

  test("Reads files on system", async () => {
    try {
      const file = await readFile("./test/untestable3_input.csv");
      expect(file).equal(testData.join("\n").toString());
    } catch (e) {
      expect(e).equal(undefined);
    }
  });

});
