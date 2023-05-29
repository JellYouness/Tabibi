"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parent = void 0;
const parent = ({ addVariant }) => {
    addVariant("parent", "@selector (> *)");
    addVariant("parent-hover", "&::parent-hover");
    addVariant("parent-focus", "&::parent-focus");
    addVariant("parent-active", "&::parent-active");
};
exports.parent = parent;
