"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = __importDefault(require("tailwindcss/plugin"));
const flattenColorPalette_1 = __importDefault(require("tailwindcss/lib/util/flattenColorPalette"));
const toColorValue_1 = __importDefault(require("tailwindcss/lib/util/toColorValue"));
exports.default = (0, plugin_1.default)(function ({ addVariant, matchUtilities, theme }) {
    addVariant("web", "&");
    addVariant("parent", "& > *");
    addVariant("group-isolate-hover", "&.group-isolate-hover");
    addVariant("group-isolate-focus", "&.group-isolate-focus");
    addVariant("group-isolate-active", "&.group-isolate-active");
    matchUtilities({
        color: (value) => {
            return { color: (0, toColorValue_1.default)(value) };
        },
    }, { values: (0, flattenColorPalette_1.default)(theme("textColor")), type: "color" });
});
