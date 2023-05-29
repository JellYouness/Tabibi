"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupIsolate = void 0;
const groupIsolate = ({ addVariant }) => {
    addVariant("group-isolate-hover", "&::group-isolate-hover");
    addVariant("group-isolate-active", "&::group-isolate-active");
    addVariant("group-isolate-focus", "&::group-isolate-focus");
};
exports.groupIsolate = groupIsolate;
