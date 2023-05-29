"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = void 0;
const flattenColorPalette_1 = __importDefault(require("tailwindcss/lib/util/flattenColorPalette"));
const toColorValue_1 = __importDefault(require("tailwindcss/lib/util/toColorValue"));
const color = ({ matchUtilities, theme }) => {
    matchUtilities({
        color: (value) => {
            return { color: (0, toColorValue_1.default)(value) };
        },
    }, { values: (0, flattenColorPalette_1.default)(theme("textColor")), type: "color" });
};
exports.color = color;
