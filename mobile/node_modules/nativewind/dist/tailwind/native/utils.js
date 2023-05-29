"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = void 0;
// eslint-disable-next-line @typescript-eslint/ban-types
function isPlainObject(value) {
    if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
}
exports.isPlainObject = isPlainObject;
