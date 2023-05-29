"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRuntimeFunction = void 0;
/**
 * These need to be in a separate file as they are also used by Babel
 *
 * The main file imports 'react-native' which needs to be compiled
 */
function isRuntimeFunction(input) {
    return typeof input === "string" && input.startsWith("__{");
}
exports.isRuntimeFunction = isRuntimeFunction;
