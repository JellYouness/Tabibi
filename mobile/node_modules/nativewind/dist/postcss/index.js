"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_1 = __importDefault(require("postcss"));
const postcss_calc_1 = __importDefault(require("postcss-calc"));
const postcss_css_variables_1 = __importDefault(require("postcss-css-variables"));
const postcss_color_functional_notation_1 = __importDefault(require("postcss-color-functional-notation"));
const postcss_nested_1 = __importDefault(require("postcss-nested"));
const plugin_1 = __importDefault(require("./plugin"));
const pluginPack = (options) => {
    return (0, postcss_1.default)([
        (0, postcss_css_variables_1.default)(),
        (0, postcss_color_functional_notation_1.default)(),
        (0, postcss_calc_1.default)({
            warnWhenCannotResolve: true,
        }),
        (0, postcss_nested_1.default)({ bubble: ["selector"] }),
        (0, plugin_1.default)(options),
    ]);
};
pluginPack.postcss = true;
exports.default = pluginPack;
