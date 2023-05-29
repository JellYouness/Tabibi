import { PluginCreator } from "postcss";
import { StyleRecord, StyleError, AtRuleTuple } from "../types/common";
import { StyleSheetRuntime } from "../style-sheet";
declare const atRuleSymbol: unique symbol;
declare const isForChildrenSymbol: unique symbol;
declare module "postcss" {
    abstract class Container {
        [atRuleSymbol]: AtRuleTuple[];
        [isForChildrenSymbol]: boolean;
    }
}
export interface ExtractedValues {
    styles: StyleRecord;
    topics: Record<string, Array<string>>;
    masks: Record<string, number>;
    units: StyleSheetRuntime["units"];
    childClasses: Record<string, string[]>;
    atRules: Record<string, Array<AtRuleTuple[]>>;
    transforms: Record<string, true>;
}
export interface DoneResult extends ExtractedValues {
    errors: StyleError[];
}
export interface PostcssPluginOptions {
    output?: string;
    done?: (result: DoneResult) => void;
}
export declare const plugin: PluginCreator<PostcssPluginOptions>;
export default plugin;
