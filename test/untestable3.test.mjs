import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv, readFile, parseCSV, readAndParseCSV } from "../src/testable3.ts";

const testData = ['Loid,Forger,,Male', 'Anya,Forger,6,Female', 'Yor,Forger,27,Female'];
const testDataAsCSVRecords = [
  ['Loid', 'Forger', '', 'Male'],
  ['Anya', 'Forger', '6', 'Female'],
  ['Yor', 'Forger', '27', 'Female']
];
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
    expect(parsed).to.deep.equal(testDataAsCSVRecords);
  })

  test("Parsed csv records gets mapped in to persons", () => {
    const persons = parsePeopleCsv(testDataAsCSVRecords);
    persons.forEach((person) => {
      expect(person).to.haveOwnProperty('firstName');
      expect(person).to.haveOwnProperty('lastName');
      expect(person).to.haveOwnProperty('gender');
    })
  })

  test("Read parses and maps to people", async () => {
    try {
      const filePath = "./test/untestable3_input.csv"
      const parsedPersons = await readAndParseCSV(filePath, readFile, parseCSV, parsePeopleCsv);
      parsedPersons.forEach((person) => {
        expect(person).to.haveOwnProperty('firstName');
        expect(person).to.haveOwnProperty('lastName');
        expect(person).to.haveOwnProperty('gender');
      })
    } catch (e) {
      console.log(e)
      expect(e).equal(undefined);
    }
  })
});
