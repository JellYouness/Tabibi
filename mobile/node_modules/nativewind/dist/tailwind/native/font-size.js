"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontSize = void 0;
const utils_1 = require("./utils");
/**
 * This "fixes" the fontSize plugin to calculate relative lineHeight's
 * based upon the fontsize. lineHeight's with units are kept as is
 *
 * Eg
 * { lineHeight: 1, fontSize: 12 } -> { lineHeight: 12, fontSize 12}
 * { lineHeight: 1px, fontSize: 12 } -> { lineHeight: 1px, fontSize 12}
 */
const fontSize = ({ matchUtilities, theme }) => {
    matchUtilities({
        text: (value) => {
            const [fontSize, options] = Array.isArray(value) ? value : [value];
            const { lineHeight, letterSpacing } = (0, utils_1.isPlainObject)(options)
                ? options
                : { lineHeight: options, letterSpacing: undefined };
            return {
                "font-size": fontSize,
                ...(lineHeight === undefined
                    ? {}
                    : {
                        "line-height": lineHeight.endsWith("px")
                            ? lineHeight
                            : `${Number.parseFloat(fontSize) * lineHeight}px`,
                    }),
                ...(letterSpacing === undefined
                    ? {}
                    : { "letter-spacing": letterSpacing }),
            };
        },
    }, {
        values: theme("fontSize"),
        type: ["absolute-size", "relative-size", "length", "percentage"],
    });
};
exports.fontSize = fontSize;
