"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
function vh(value) {
    const parsed = typeof value === "number" ? value : Number.parseFloat(value);
    return react_native_1.Dimensions.get("window").height * (parsed / 100);
}
exports.default = vh;
