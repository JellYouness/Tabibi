"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gap = void 0;
const gap = ({ matchUtilities, theme }) => {
    matchUtilities({
        gap: (value) => {
            value = value === "0" ? "0px" : value;
            value = value === "px" ? "1px" : value;
            return {
                "&": {
                    marginLeft: `-${value}`,
                    marginTop: `-${value}`,
                    "@selector (> *)": {
                        marginLeft: value,
                        marginTop: value,
                    },
                },
            };
        },
        "gap-x": (value) => {
            value = value === "0" ? "0px" : value;
            value = value === "px" ? "1px" : value;
            return {
                "&": {
                    "margin-left": `-${value}`,
                    "@selector (> *)": {
                        "margin-left": value,
                    },
                },
            };
        },
        "gap-y": (value) => {
            value = value === "0" ? "0px" : value;
            value = value === "px" ? "1px" : value;
            return {
                "&": {
                    "margin-top": `-${value}`,
                    "@selector (> *)": {
                        "margin-top": value,
                    },
                },
            };
        },
    }, { values: theme("gap") });
};
exports.gap = gap;
