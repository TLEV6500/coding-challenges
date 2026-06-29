export interface LanguageAdapter {
    importFunction<Func extends Function>(filePath: string, functionName?: string): Promise<Func>;
}
