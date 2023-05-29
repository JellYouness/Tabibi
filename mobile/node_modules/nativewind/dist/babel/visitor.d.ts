import type { Visitor } from "@babel/traverse";
import { AllowPathOptions, TailwindcssReactNativeBabelOptions } from "./types";
import { PluginPass } from "@babel/core";
export interface VisitorState extends PluginPass {
    opts: TailwindcssReactNativeBabelOptions;
    filename: string;
    allowModuleTransform: AllowPathOptions;
    allowRelativeModules: AllowPathOptions;
    blockList: Set<string>;
    canCompile: boolean;
    canTransform: boolean;
    didTransform: boolean;
}
export declare const visitor: Visitor<VisitorState>;
