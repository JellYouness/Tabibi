"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReactNative = void 0;
const css_to_react_native_1 = require("css-to-react-native");
const properties_1 = require("./properties");
const is_invalid_property_1 = require("./is-invalid-property");
function toReactNative(declaration, { onError }) {
    const prop = declaration.prop;
    let value = declaration.value;
    const name = (0, css_to_react_native_1.getPropertyName)(prop);
    let styles;
    try {
        const transform = properties_1.properties[name];
        let unit;
        if (value.endsWith("vw") || value.endsWith("vh")) {
            unit = value.slice(-2);
            value = value.slice(0, -2);
        }
        styles = transform
            ? transform(value, name)
            : (0, css_to_react_native_1.getStylesForProperty)(name, value);
        if (unit) {
            for (const [key, value] of Object.entries(styles)) {
                styles[key] = { value, unit };
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            onError({ declaration, error: error.message, result: styles });
        }
        return;
    }
    const hasInvalidStyle = Object.keys(styles).some((property) => {
        return (0, is_invalid_property_1.isInvalidProperty)(property);
    });
    if (hasInvalidStyle) {
        onError({
            declaration,
            error: "invalid property",
            result: styles,
        });
        return;
    }
    return styles;
}
exports.toReactNative = toReactNative;
