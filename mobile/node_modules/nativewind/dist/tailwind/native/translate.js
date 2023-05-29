"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const translate = ({ matchUtilities, theme }) => {
    matchUtilities({
        translate(value) {
            return {
                transform: `translate(${value}, ${value})`,
            };
        },
        "translate-x"(value) {
            return {
                transform: `translate(${value})`,
            };
        },
        "translate-y"(value) {
            return {
                transform: `translate(0, ${value})`,
            };
        },
    }, {
        values: theme("translate"),
        supportsNegativeValues: true,
    });
};
exports.translate = translate;
