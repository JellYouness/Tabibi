"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.space = void 0;
const space = ({ matchUtilities, theme }, notSupported) => {
    matchUtilities({
        "space-x": (value) => {
            if (value === "reverse") {
                return notSupported("space-x-reverse")();
            }
            value = value === "0" ? "0px" : value;
            return {
                "&": {
                    "@selector (> *:not(:first-child))": {
                        "margin-left": value,
                    },
                },
            };
        },
        "space-y": (value) => {
            if (value === "reverse") {
                return notSupported("space-y-reverse")();
            }
            value = value === "0" ? "0px" : value;
            return {
                "&": {
                    "@selector (> *:not(:first-child))": {
                        "margin-top": value,
                    },
                },
            };
        },
    }, { values: { ...theme("space"), reverse: "reverse" } });
};
exports.space = space;
