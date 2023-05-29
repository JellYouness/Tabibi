"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundToNearestPixel = exports.getPixelSizeForLayoutSize = exports.fontScale = exports.pixelRatio = exports.hairlineWidth = exports.platformColor = exports.platformSelect = void 0;
function create(name, ...args) {
    const json = JSON.stringify({ name, args });
    return `__${json}`;
}
const platformSelect = (value) => create("platformSelect", value);
exports.platformSelect = platformSelect;
const platformColor = (color) => create("platformColor", color);
exports.platformColor = platformColor;
const hairlineWidth = () => create("hairlineWidth");
exports.hairlineWidth = hairlineWidth;
const pixelRatio = (v) => create("pixelRatio", v);
exports.pixelRatio = pixelRatio;
const fontScale = (v) => create("fontScale", v);
exports.fontScale = fontScale;
const getPixelSizeForLayoutSize = (n) => create("getPixelSizeForLayoutSize", n);
exports.getPixelSizeForLayoutSize = getPixelSizeForLayoutSize;
const roundToNearestPixel = (n) => create("roundToNearestPixel", n);
exports.roundToNearestPixel = roundToNearestPixel;
