import { Config } from "tailwindcss";
import { StyleError } from "../types/common";
import { ExtractedValues } from "./plugin";
export declare function extractStyles(tailwindConfig: Config, cssInput?: string): {
    errors: StyleError[];
    raw: Partial<ExtractedValues>;
    hasStyles: boolean;
    stylesheetCreateExpression: import("@babel/types").CallExpression;
};
