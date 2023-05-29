"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skew = void 0;
const skew = ({ matchUtilities, theme }) => {
    matchUtilities({
        "skew-x"(value) {
            return {
                transform: `skewX(${value})`,
            };
        },
        "skew-y"(value) {
            return {
                transform: `skewY(${value})`,
            };
        },
    }, {
        values: theme("skew"),
        supportsNegativeValues: true,
    });
};
exports.skew = skew;
