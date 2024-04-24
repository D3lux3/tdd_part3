import { readFile as rf } from "node:fs/promises";
import { parse } from "csv-parse/sync";

interface ParsedRecords {
    firstName: string;
    lastName: string;
    gender: string;
    age: number | undefined;
}

export const readFile = async (filePath: string) => {
    return await rf(filePath, { encoding: "utf8" });
}

export const parseCSV = (csvData: string) => {
    return parse(csvData, {
        skip_empty_lines: true,
        trim: true,
    });
}

export function parsePeopleCsv(csvRecords: string[]) {
    return csvRecords.map(([firstName, lastName, age, gender]) => ({
        firstName,
        lastName,
        gender: gender.charAt(0).toLowerCase(),
        age: age !== "" ? parseInt(age) : undefined
    }));
}

export async function readAndParseCSV(filePath: string, readFile: (csvData: string) => Promise<string>, parseCSV: (csvData: string) => string[], parsePeopleCsv: (csvRecords: string[]) => ParsedRecords[]) {
    const csvData = await readFile(filePath);
    const records = parseCSV(csvData);
    return parsePeopleCsv(records);
}