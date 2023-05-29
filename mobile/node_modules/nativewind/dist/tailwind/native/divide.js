"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.divide = void 0;
const flattenColorPalette_1 = __importDefault(require("tailwindcss/lib/util/flattenColorPalette"));
const toColorValue_1 = __importDefault(require("tailwindcss/lib/util/toColorValue"));
const divide = ({ matchUtilities, theme, addUtilities, }) => {
    matchUtilities({
        "divide-x": (value) => {
            value = value === "0" ? "0px" : value;
            return {
                "&": {
                    "@selector (> *:not(:first-child))": {
                        "border-left-width": value,
                        "border-right-width": 0,
                    },
                },
            };
        },
        "divide-y": (value) => {
            value = value === "0" ? "0px" : value;
            return {
                "&": {
                    "@selector (> *:not(:first-child))": {
                        "border-bottom-width": 0,
                        "border-top-width": value,
                    },
                },
            };
        },
    }, { values: theme("divideWidth"), type: ["line-width", "length"] });
    matchUtilities({
        divide: (value) => {
            return {
                "&": {
                    "@selector (> *:not(:first-child))": {
                        "border-color": (0, toColorValue_1.default)(value),
                    },
                },
            };
        },
    }, {
        values: (({ DEFAULT: _, ...colors }) => colors)((0, flattenColorPalette_1.default)(theme("divideColor"))),
        type: "color",
    });
    addUtilities({
        ".divide-solid": {
            "@selector (> *:not(:first-child))": {
                "border-style": "solid",
            },
        },
        ".divide-dashed": {
            "@selector (> *:not(:first-child))": {
                "border-style": "dashed",
            },
        },
        ".divide-dotted": {
            "@selector (> *:not(:first-child))": {
                "border-style": "dotted",
            },
        },
        ".divide-double": {
            "@selector (> *:not(:first-child))": {
                "border-style": "double",
            },
        },
        ".divide-none": {
            "@selector (> *:not(:first-child))": {
                "border-style": "none",
            },
        },
    });
};
exports.divide = divide;
