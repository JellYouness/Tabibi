import { AtRuleTuple, Style } from "../types/common";
export declare function getRuntime(selector: string, nativeDeclarations: Style, atRules: AtRuleTuple[] | undefined): {
    declarations: Record<string, unknown>;
    units: {
        [k: string]: string;
    } | undefined;
    topics: string[] | undefined;
};
