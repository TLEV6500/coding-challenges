import { LanguageAdapter } from "./LanguageAdapter";
import { TsAdapter } from "./TsAdapter";

export function getLanguageAdapter(language: string): LanguageAdapter {
    switch (language) {
        case "ts":
            return new TsAdapter(language);
        default:
            throw new Error(`Language unsupported or not yet implemented: ${language}`);
    }
}
