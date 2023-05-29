"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
const selector_1 = require("../utils/selector");
const to_react_native_1 = require("./to-react-native");
const fs_writer_1 = require("./fs-writer");
const get_runtime_1 = require("./get-runtime");
const atRuleSymbol = Symbol("media");
const isForChildrenSymbol = Symbol("children");
const plugin = ({ done, output, } = {}) => {
    const styles = {};
    const topics = {};
    const childClasses = {};
    const masks = {};
    const units = {};
    const atRules = {};
    const transforms = {};
    const errors = [];
    return {
        postcssPlugin: "nativewind-style-extractor",
        OnceExit: (root) => {
            root.walk((node) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (node.type === "atrule") {
                    (_a = node[atRuleSymbol]) !== null && _a !== void 0 ? _a : (node[atRuleSymbol] = ((_b = node === null || node === void 0 ? void 0 : node.parent) === null || _b === void 0 ? void 0 : _b[atRuleSymbol])
                        ? [...node.parent[atRuleSymbol]]
                        : []);
                    if (node.name === "selector" && node.params.startsWith("(>")) {
                        node[isForChildrenSymbol] = true;
                    }
                    node[atRuleSymbol].push([node.name, node.params]);
                }
                else if (node.type === "rule") {
                    let nativeDeclarations = {};
                    // Get all the declarations
                    node.walkDecls((decl) => {
                        nativeDeclarations = {
                            ...nativeDeclarations,
                            ...(0, to_react_native_1.toReactNative)(decl, {
                                onError: (error) => errors.push(error),
                            }),
                        };
                    });
                    if (Object.keys(nativeDeclarations).length === 0) {
                        return;
                    }
                    const hasTransformRules = Boolean(nativeDeclarations.transform);
                    for (const s of node.selectors) {
                        const mask = (0, selector_1.getSelectorMask)(s, s.includes('[dir="rtl"]'));
                        const rules = (_c = node.parent) === null || _c === void 0 ? void 0 : _c[atRuleSymbol];
                        const { declarations, units: selectorUnits, topics: selectorTopics, } = (0, get_runtime_1.getRuntime)(s, nativeDeclarations, rules);
                        let selector = (0, selector_1.normalizeCssSelector)(s);
                        if (hasTransformRules) {
                            transforms[selector] = true;
                        }
                        if (mask > 0) {
                            (_d = masks[selector]) !== null && _d !== void 0 ? _d : (masks[selector] = 0);
                            masks[selector] |= mask;
                        }
                        if ((_e = node.parent) === null || _e === void 0 ? void 0 : _e[isForChildrenSymbol]) {
                            const childSelector = `${selector}.children`;
                            (_f = childClasses[selector]) !== null && _f !== void 0 ? _f : (childClasses[selector] = []);
                            childClasses[selector].push(childSelector);
                            selector = childSelector;
                        }
                        if (selectorTopics) {
                            (_g = topics[selector]) !== null && _g !== void 0 ? _g : (topics[selector] = new Set());
                            for (const topic of selectorTopics) {
                                topics[selector].add(topic);
                            }
                        }
                        if (rules) {
                            (_h = atRules[selector]) !== null && _h !== void 0 ? _h : (atRules[selector] = []);
                            atRules[selector].push(rules);
                            selector = (0, selector_1.createAtRuleSelector)(selector, atRules[selector].length - 1);
                        }
                        if (selectorUnits) {
                            units[selector] = selectorUnits;
                        }
                        styles[selector] = declarations;
                    }
                }
            });
            const arrayTopics = {};
            for (const [key, value] of Object.entries(topics)) {
                arrayTopics[key] = [...value.values()];
            }
            if (done)
                done({
                    styles,
                    masks,
                    atRules,
                    childClasses,
                    transforms,
                    topics: arrayTopics,
                    units,
                    errors,
                });
            if (output) {
                (0, fs_writer_1.outputWriter)(output, {
                    styles,
                    masks,
                    atRules,
                    childClasses,
                    units,
                    transforms,
                    topics: arrayTopics,
                });
            }
        },
    };
};
exports.plugin = plugin;
exports.plugin.postcss = true;
exports.default = exports.plugin;
