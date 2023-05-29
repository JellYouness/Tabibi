"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pseudoClasses = void 0;
const pseudoClasses = ({ addVariant }) => {
    addVariant("hover", "&::hover");
    addVariant("focus", "&::focus");
    addVariant("active", "&::active");
};
exports.pseudoClasses = pseudoClasses;
