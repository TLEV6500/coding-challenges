import { LanguageAdapter } from "@code-exams/languages/LanguageAdapter";
import { getLanguageAdapter } from "@code-exams/languages/index";

export async function getFunction<Func extends Function>(solutionPath: string, variantName: string, language: string): Promise<Func> {
    const languageAdapter: LanguageAdapter = getLanguageAdapter(language)
    let solutionFunction: Func
    try {
        solutionFunction = await languageAdapter.importFunction<Func>(solutionPath)
        return solutionFunction
    } catch (err) {
        console.error(`Failed to import solution function for "${variantName}": ${err}`)
        process.exit(1)
    }
}
