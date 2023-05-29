import type { ConfigAPI, PluginPass, Visitor } from "@babel/core";
import { TailwindcssReactNativeBabelOptions } from "./types";
export default function (api: ConfigAPI, options: TailwindcssReactNativeBabelOptions, cwd: string): {
    visitor: Visitor<PluginPass & {
        opts: TailwindcssReactNativeBabelOptions;
    }>;
};
