"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineHeight = void 0;
const lineHeight = ({ matchUtilities, theme }, notSupported) => {
    matchUtilities({
        leading(value) {
            if (typeof value !== "string") {
                return notSupported(`leading-${value}`)();
            }
            if (value.endsWith("px")) {
                return { lineHeight: value };
            }
            return notSupported(`leading-${value}`)();
        },
    }, {
        values: { ...theme("lineHeight"), reverse: true },
        supportsNegativeValues: true,
    });
};
exports.lineHeight = lineHeight;
