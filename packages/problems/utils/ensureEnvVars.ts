export function ensureEnvVars(): { solutionPath: string; variantName: string; language: string } {
    const solutionPath = process.env.SOLUTION_PATH;
    const variantName = process.env.SOLUTION_VARIANT;
    const language = process.env.SOLUTION_LANGUAGE;

    if (!solutionPath || !variantName || !language) {
        throw new Error("SOLUTION_PATH, SOLUTION_VARIANT, and SOLUTION_LANGUAGE environment variables must be set");
    }
    return { solutionPath, variantName, language }
}
