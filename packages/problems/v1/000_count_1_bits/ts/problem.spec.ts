import { describe, expect, it } from "bun:test"
import { CountBits, TestData } from "./problem.types";
import { getFunction } from "utils/getFunction";
import { ensureEnvVars } from "utils/ensureEnvVars";

const { solutionPath, variantName, language } = ensureEnvVars();
const solutionFunction = await getFunction<CountBits>(solutionPath, variantName, language);

const { default: testCases }: { default: TestData } = await import("../test-data/set-1.json")

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
