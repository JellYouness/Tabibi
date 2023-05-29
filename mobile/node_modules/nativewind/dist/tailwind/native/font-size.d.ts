import { PluginAPI } from "tailwindcss/types/config";
/**
 * This "fixes" the fontSize plugin to calculate relative lineHeight's
 * based upon the fontsize. lineHeight's with units are kept as is
 *
 * Eg
 * { lineHeight: 1, fontSize: 12 } -> { lineHeight: 12, fontSize 12}
 * { lineHeight: 1px, fontSize: 12 } -> { lineHeight: 1px, fontSize 12}
 */
export declare const fontSize: ({ matchUtilities, theme }: PluginAPI) => void;
