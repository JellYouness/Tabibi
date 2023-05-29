"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
function vw(value) {
    const parsed = typeof value === "number" ? value : Number.parseFloat(value);
    return react_native_1.Dimensions.get("window").width * (parsed / 100);
}
exports.default = vw;
