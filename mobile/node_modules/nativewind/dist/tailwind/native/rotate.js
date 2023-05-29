"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotate = void 0;
const rotate = ({ matchUtilities, theme }) => {
    matchUtilities({
        rotate(value) {
            return {
                transform: `rotate(${value})`,
            };
        },
    }, {
        values: theme("rotate"),
        supportsNegativeValues: true,
    });
};
exports.rotate = rotate;
