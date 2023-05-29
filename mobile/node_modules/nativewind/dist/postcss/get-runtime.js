"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRuntime = void 0;
const selector_1 = require("../utils/selector");
function getRuntime(selector, nativeDeclarations, atRules) {
    const units = new Map();
    const topics = new Set();
    const declarations = { ...nativeDeclarations };
    if ((0, selector_1.hasDarkPseudoClass)(selector))
        topics.add("colorScheme");
    for (const [key, value] of Object.entries(declarations)) {
        if (valueHasUnit(value)) {
            if (value.unit === "vw") {
                units.set(key, "vw");
                topics.add("width");
            }
            if (value.unit === "vh") {
                units.set(key, "vh");
                topics.add("height");
            }
            declarations[key] = value.value;
        }
    }
    if (atRules) {
        for (const [atRule, params] of atRules) {
            if (atRule === "media" && params) {
                if (params.includes("width"))
                    topics.add("width");
                if (params.includes("height"))
                    topics.add("height");
                if (params.includes("orientation"))
                    topics.add("orientation");
                if (params.includes("aspect-ratio"))
                    topics.add("window");
            }
        }
    }
    return {
        declarations,
        units: units.size > 0 ? Object.fromEntries(units.entries()) : undefined,
        topics: topics.size > 0 ? [...topics.values()] : undefined,
    };
}
exports.getRuntime = getRuntime;
function valueHasUnit(value) {
    return Boolean(typeof value === "object" && value && "unit" in value);
}
