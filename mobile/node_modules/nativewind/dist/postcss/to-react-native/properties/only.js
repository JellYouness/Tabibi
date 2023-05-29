"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.only = exports.noop = void 0;
const css_to_react_native_1 = require("css-to-react-native");
// eslint-disable-next-line unicorn/consistent-function-scoping
function noop() {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const callback = (value, name) => {
        return (0, css_to_react_native_1.getStylesForProperty)(name, value);
    };
    callback.prop = "";
    return callback;
}
exports.noop = noop;
function only(options) {
    const { values = [], units, number, color, auto, } = Array.isArray(options) ? { values: options } : options;
    const callback = (value, name) => {
        const float = Number.parseFloat(value);
        const isNaN = Number.isNaN(float);
        const isAuto = value === "auto";
        if (isFunctionValue(value)) {
            /**
             * This is a hack to support platform values: hairlineWidth()
             *
             * We need to preserve this value all the way to the style serialization
             * where they are outputted as runtime values: StyleSheet.hairlineWidth
             *
             * But we also need to convert shorthand css property names to their long form
             *
             * so { borderWidth: styleSheet(hairlineWidth() } needs to be turned into
             *
             * {
             *  "borderBottomWidth": "hairlineWidth()",
             *  "borderLeftWidth": "hairlineWidth()",
             *  "borderRightWidth": "hairlineWidth()",
             *  "borderTopWidth": "hairlineWidth()",
             * }
             *
             * We achieve this by generating a fake style object and replacing its values.
             */
            const fakePropertyStyles = number || units
                ? (0, css_to_react_native_1.getStylesForProperty)(name, "1px")
                : (0, css_to_react_native_1.getStylesForProperty)(name, "transparent");
            return Object.fromEntries(Object.entries(fakePropertyStyles).map(([key]) => [key, value]));
        }
        if (auto && isAuto) {
            return Object.fromEntries(Object.entries((0, css_to_react_native_1.getStylesForProperty)(name, "1px")).map(([key]) => [
                key,
                value,
            ]));
        }
        if (number) {
            if (isNaN) {
                throw new Error(name);
            }
            else if (units && float.toString() === value) {
                return (0, css_to_react_native_1.getStylesForProperty)(name, `${float}${units[0]}`);
            }
            if (!units) {
                return (0, css_to_react_native_1.getStylesForProperty)(name, value);
            }
            else if (units.some((unit) => value.endsWith(unit))) {
                return (0, css_to_react_native_1.getStylesForProperty)(name, value);
            }
        }
        if ((color &&
            (value.startsWith("#") ||
                value.startsWith("rgb(") ||
                value.startsWith("rgba(") ||
                value.startsWith("hsl("))) ||
            value === "transparent") {
            return (0, css_to_react_native_1.getStylesForProperty)(name, value);
        }
        if (!isNaN && (units === null || units === void 0 ? void 0 : units.some((unit) => value.endsWith(unit)))) {
            return (0, css_to_react_native_1.getStylesForProperty)(name, value);
        }
        if (values.includes(value)) {
            return (0, css_to_react_native_1.getStylesForProperty)(name, value);
        }
        throw new Error(name);
    };
    return callback;
}
exports.only = only;
function isFunctionValue(value) {
    return value.startsWith("__{");
}
