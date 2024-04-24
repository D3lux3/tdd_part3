import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv, readFile, parseCSV } from "../src/testable3.ts";

const testData = ['Loid,Forger,,Male', 'Anya,Forger,6,Female', 'Yor,Forger,27,Female'];
const testDataFormatted = testData.join("\n").toString();

describe("Untestable 3: CSV file parsing", () => {

  test("Reads files on system", async () => {
    try {
      const file = await readFile("./test/untestable3_input.csv");
      expect(file).equal(testDataFormatted);
    } catch (e) {
      expect(e).equal(undefined);
    }
  });

  test("Parses csv into records", () => {
    const parsed = parseCSV(testDataFormatted);
    const testDataNames = testData.map((line) => line.split(',')[0])
    const parsedNames = parsed.map((record) => record[0])
    expect(parsed.length).equal(3);
    expect(parsedNames).to.deep.equal(testDataNames);
  })

});
