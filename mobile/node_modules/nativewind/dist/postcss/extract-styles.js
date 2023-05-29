"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractStyles = void 0;
const postcss_1 = __importDefault(require("postcss"));
const tailwindcss_1 = __importDefault(require("tailwindcss"));
const postcss_2 = __importDefault(require("../postcss"));
const serialize_1 = require("./serialize");
function extractStyles(tailwindConfig, cssInput = "@tailwind components;@tailwind utilities;") {
    let errors = [];
    let output = {
        styles: {},
        topics: {},
        masks: {},
        atRules: {},
        units: {},
        transforms: {},
        childClasses: {},
    };
    const plugins = [
        (0, tailwindcss_1.default)(tailwindConfig),
        (0, postcss_2.default)({
            ...tailwindConfig,
            done: ({ errors: resultErrors, ...result }) => {
                output = result;
                errors = resultErrors;
            },
        }),
    ];
    (0, postcss_1.default)(plugins).process(cssInput).css;
    return {
        ...(0, serialize_1.serializer)(output),
        errors,
    };
}
exports.extractStyles = extractStyles;
