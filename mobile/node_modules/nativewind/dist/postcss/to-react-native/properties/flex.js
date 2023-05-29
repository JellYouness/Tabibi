"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flex = void 0;
const css_to_react_native_1 = require("css-to-react-native");
const flex = (value, name) => {
    const { flexGrow, flexShrink, flexBasis } = (0, css_to_react_native_1.getStylesForProperty)(name, value);
    return { flexGrow, flexShrink, flexBasis };
};
exports.flex = flex;
exports.flex.prop = "flex";
