"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontFamily = void 0;
const css_to_react_native_1 = require("css-to-react-native");
function fontFamily(value, name) {
    return (0, css_to_react_native_1.getStylesForProperty)(name, value.split(",")[0]);
}
exports.fontFamily = fontFamily;
