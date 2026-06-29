import { LanguageAdapter } from "./LanguageAdapter";

export class TsAdapter implements LanguageAdapter {
    private language: string;

    constructor(language: string) {
        this.language = language;
    }

    async importFunction<Func extends Function>(filePath: string, functionName?: string): Promise<Func> {
        const module = await import(filePath);
        if (functionName) {
            return module[functionName];
        }
        return module.default;
    }
}
