"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someAttributes = void 0;
const types_1 = require("@babel/types");
function someAttributes(path, names) {
    return path.node.openingElement.attributes.some((attribute) => {
        /**
         * I think we should be able to process spread attributes
         * by checking their binding, but I still learning how this works
         *
         * If your reading this and understand Babel bindings please send a PR
         */
        if ((0, types_1.isJSXSpreadAttribute)(attribute)) {
            return false;
        }
        return names.some((name) => {
            return ((0, types_1.isJSXAttribute)(attribute) && (0, types_1.isJSXIdentifier)(attribute.name, { name }));
        });
    });
}
exports.someAttributes = someAttributes;
