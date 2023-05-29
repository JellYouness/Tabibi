"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitor = void 0;
const get_import_blocked_components_1 = require("./utils/get-import-blocked-components");
const has_attribute_1 = require("./utils/has-attribute");
const types_1 = require("@babel/types");
exports.visitor = {
    ImportDeclaration(path, state) {
        for (const component of (0, get_import_blocked_components_1.getImportBlockedComponents)(path, state)) {
            state.blockList.add(component);
        }
    },
    JSXElement: {
        exit: (path, state) => {
            const { blockList, canTransform } = state;
            if (isWrapper(path.node) ||
                !canTransform ||
                !(0, has_attribute_1.someAttributes)(path, ["className", "tw"])) {
                return;
            }
            const name = getElementName(path.node.openingElement);
            if (blockList.has(name) || name[0] !== name[0].toUpperCase()) {
                return;
            }
            state.didTransform || (state.didTransform = true);
            path.replaceWith((0, types_1.jsxElement)((0, types_1.jsxOpeningElement)((0, types_1.jsxIdentifier)("_StyledComponent"), [
                ...path.node.openingElement.attributes,
                (0, types_1.jSXAttribute)((0, types_1.jSXIdentifier)("component"), (0, types_1.jsxExpressionContainer)(toExpression(path.node.openingElement.name))),
            ]), (0, types_1.jsxClosingElement)((0, types_1.jsxIdentifier)("_StyledComponent")), path.node.children));
        },
    },
};
function isWrapper(node) {
    const nameNode = node.openingElement.name;
    if ((0, types_1.isJSXIdentifier)(nameNode)) {
        return (nameNode.name === "_StyledComponent" ||
            nameNode.name === "StyledComponent");
    }
    else if ((0, types_1.isJSXMemberExpression)(nameNode)) {
        return (nameNode.property.name === "_StyledComponent" ||
            nameNode.property.name === "StyledComponent");
    }
    else {
        return false;
    }
}
function getElementName({ name }) {
    if ((0, types_1.isJSXIdentifier)(name)) {
        return name.name;
    }
    else if ((0, types_1.isJSXMemberExpression)(name)) {
        return name.property.name;
    }
    else {
        // https://github.com/facebook/jsx/issues/13#issuecomment-54373080
        throw new Error("JSXNamespacedName is not supported by React JSX");
    }
}
function toExpression(node) {
    if ((0, types_1.isJSXIdentifier)(node)) {
        return (0, types_1.identifier)(node.name);
    }
    else if ((0, types_1.isJSXMemberExpression)(node)) {
        return (0, types_1.memberExpression)(toExpression(node.object), toExpression(node.property));
    }
    else {
        // https://github.com/facebook/jsx/issues/13#issuecomment-54373080
        throw new Error("JSXNamespacedName is not supported by React JSX");
    }
}
