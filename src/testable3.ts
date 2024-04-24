import { readFile as rf } from "node:fs/promises";
import { parse } from "csv-parse/sync";

export const readFile = async (filePath: string) => {
    return await rf(filePath, { encoding: "utf8" });
}

export async function parsePeopleCsv(filePath) {
    const csvData = await rf(filePath, { encoding: "utf8" });
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
