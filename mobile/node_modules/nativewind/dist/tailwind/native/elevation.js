"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elevation = void 0;
const elevation = ({ matchUtilities, theme }) => {
    matchUtilities({
        elevation(value) {
            return {
                elevation: value,
            };
        },
    }, {
        values: theme("elevation"),
    });
};
exports.elevation = elevation;
