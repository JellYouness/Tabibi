"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aspectRatio = void 0;
const css_to_react_native_1 = require("css-to-react-native");
const aspectRatio = (value) => {
    if (value === "0") {
        return {};
    }
    else if (typeof value === "string" && value.includes("/")) {
        const [left, right] = value.split("/").map((n) => {
            return Number.parseInt(n, 10);
        });
        return (0, css_to_react_native_1.getStylesForProperty)("aspectRatio", `${left / right}`);
    }
    return (0, css_to_react_native_1.getStylesForProperty)("aspectRatio", value);
};
exports.aspectRatio = aspectRatio;
exports.aspectRatio.prop = "aspectRatio";
