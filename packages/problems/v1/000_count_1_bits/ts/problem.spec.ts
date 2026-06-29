import { describe, expect, it } from "bun:test"
import { CountBits, TestData } from "./problem.types";
import { LanguageAdapter } from "../../../../languages/LanguageAdapter";
import { getLanguageAdapter } from "../../../../languages";

const solutionPath = process.env.SOLUTION_PATH;
const variantName = process.env.SOLUTION_VARIANT;
const language = process.env.SOLUTION_LANGUAGE;

if (!solutionPath || !variantName || !language) {
    throw new Error("SOLUTION_PATH, SOLUTION_VARIANT, and SOLUTION_LANGUAGE environment variables must be set");
}

const languageAdapter: LanguageAdapter = getLanguageAdapter(language)
let solutionFunction: CountBits
try {
    solutionFunction = await languageAdapter.importFunction<CountBits>(solutionPath)
} catch (err) {
    console.error(`Failed to import solution function for "${variantName}": ${err}`)
    process.exit(1)
}

const testCases: TestData = {
    "case_1": {
        input: 5,
        expected: {
            count: 2,
            indices: [0, 2],
        },
    },
    "case_2": {
        input: 0,
        expected: {
            count: 0,
            indices: [],
        },
    },
    "case_3": {
        input: 7,
        expected: {
            count: 3,
            indices: [0, 1, 2],
        },
    },
    "case_4": {
        input: 13,
        expected: {
            count: 3,
            indices: [0, 1, 3],
        },
    },
}

for (const [name, { input, expected }] of Object.entries(testCases)) {
    describe(`000_count_1_bits using ${name} on ${variantName}`, () => {
        describe(`when given an integer ${input}`, () => {
            it(`should return ${JSON.stringify(expected)}`, () => {
                const result = solutionFunction(input);
                expect(result).toEqual(expected);
            });
        });
    });
}
