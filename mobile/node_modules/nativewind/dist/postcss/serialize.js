"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializer = void 0;
const types_1 = require("@babel/types");
const style_function_helpers_1 = require("../style-sheet/style-function-helpers");
function serializer({ styles: rawStyles, atRules, masks, units, topics, childClasses, transforms, }) {
    const serializedStyles = {};
    for (const [key, style] of Object.entries(rawStyles)) {
        serializedStyles[key] = {};
        for (const [k, v] of Object.entries(style)) {
            serializedStyles[key][k] = v;
        }
    }
    const styles = babelSerializeLiteral(serializedStyles);
    const objectProperties = [
        (0, types_1.objectProperty)((0, types_1.identifier)("styles"), styles),
    ];
    const raw = {
        styles: rawStyles,
    };
    if (Object.keys(atRules).length > 0) {
        raw.atRules = atRules;
        objectProperties.push((0, types_1.objectProperty)((0, types_1.identifier)("atRules"), babelSerializeLiteral(atRules)));
    }
    if (Object.keys(transforms).length > 0) {
        raw.transforms = transforms;
        objectProperties.push((0, types_1.objectProperty)((0, types_1.identifier)("transforms"), babelSerializeLiteral(transforms)));
    }
    if (Object.keys(masks).length > 0) {
        raw.masks = masks;
        objectProperties.push((0, types_1.objectProperty)((0, types_1.identifier)("masks"), babelSerializeLiteral(masks)));
    }
    if (Object.keys(topics).length > 0) {
        raw.topics = topics;
        objectProperties.push((0, types_1.objectProperty)((0, types_1.identifier)("topics"), babelSerializeLiteral(topics)));
    }
    if (Object.keys(units).length > 0) {
        raw.units = units;
        objectProperties.push((0, types_1.objectProperty)((0, types_1.identifier)("units"), babelSerializeLiteral(units)));
    }
    if (Object.keys(childClasses).length > 0) {
        raw.childClasses = childClasses;
        objectProperties.push((0, types_1.objectProperty)((0, types_1.identifier)("childClasses"), babelSerializeLiteral(childClasses)));
    }
    return {
        raw,
        hasStyles: Object.keys(rawStyles).length > 0,
        stylesheetCreateExpression: (0, types_1.callExpression)((0, types_1.memberExpression)((0, types_1.identifier)("_NativeWindStyleSheet"), (0, types_1.identifier)("create")), [(0, types_1.objectExpression)(objectProperties)]),
    };
}
exports.serializer = serializer;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function babelSerializeLiteral(literal) {
    if ((0, types_1.isExpression)(literal)) {
        return literal;
    }
    if (literal === null) {
        return (0, types_1.nullLiteral)();
    }
    switch (typeof literal) {
        case "number":
            return (0, types_1.numericLiteral)(literal);
        case "string":
            if ((0, style_function_helpers_1.isRuntimeFunction)(literal)) {
                const { name, args } = JSON.parse(literal.slice(2));
                return (0, types_1.callExpression)((0, types_1.memberExpression)((0, types_1.identifier)("_NativeWindStyleSheet"), (0, types_1.identifier)(name)), args.map((argument) => babelSerializeLiteral(argument)));
            }
            else {
                return (0, types_1.stringLiteral)(literal);
            }
        case "boolean":
            return (0, types_1.booleanLiteral)(literal);
        case "undefined":
            return (0, types_1.unaryExpression)("void", (0, types_1.numericLiteral)(0), true);
        default:
            if (Array.isArray(literal)) {
                return (0, types_1.arrayExpression)(literal.map((n) => babelSerializeLiteral(n)));
            }
            if (isObject(literal)) {
                return (0, types_1.objectExpression)(Object.keys(literal)
                    .filter((k) => {
                    return typeof literal[k] !== "undefined";
                })
                    .map((k) => {
                    return (0, types_1.objectProperty)((0, types_1.stringLiteral)(k), babelSerializeLiteral(literal[k]));
                }));
            }
            throw new Error("un-serializable literal");
    }
}
function isObject(literal) {
    return typeof literal === "object";
}
