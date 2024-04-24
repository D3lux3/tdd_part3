import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

/**
 * Ill create a persistant csv file to the test folder, to be used in testing.
 * I will refactor the mapping, and also extract some of the business logic in to seperate functions.
 */

export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}
