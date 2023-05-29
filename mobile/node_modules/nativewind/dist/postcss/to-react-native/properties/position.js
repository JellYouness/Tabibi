"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.position = void 0;
const supportedValues = new Set(["absolute", "relative"]);
const position = (value) => {
    if (supportedValues.has(value)) {
        return { position: value };
    }
    // This is a special edge case
    // The tailwindcss keeps picking up `static` as its a javascript keyword
    // So instead of throwing an error we just ignore it
    if (value === "static") {
        return {};
    }
    throw new Error("position");
};
exports.position = position;
exports.position.prop = "position";
