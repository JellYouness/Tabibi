"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scale = void 0;
const scale = ({ matchUtilities, theme }) => {
    matchUtilities({
        scale(value) {
            return {
                transform: `scale(${value}, ${value})`,
            };
        },
        "scale-x"(value) {
            return {
                transform: `scaleX(${value})`,
            };
        },
        "scale-y"(value) {
            return {
                transform: `scaleY(${value})`,
            };
        },
    }, {
        values: theme("scale"),
        supportsNegativeValues: true,
    });
};
exports.scale = scale;
