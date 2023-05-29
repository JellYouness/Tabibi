"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchChildAtRule = exports.matchAtRule = void 0;
const css_mediaquery_1 = require("css-mediaquery");
const react_native_1 = require("react-native");
function matchAtRule({ rule, params, width, height, orientation, }) {
    if (rule === "media" && params) {
        return (0, css_mediaquery_1.match)(params, {
            type: react_native_1.Platform.OS,
            "aspect-ratio": width / height,
            "device-aspect-ratio": width / height,
            width,
            height,
            "device-width": width,
            "device-height": width,
            orientation,
        });
    }
    return false;
}
exports.matchAtRule = matchAtRule;
function matchChildAtRule(rule, params = "", { nthChild = -1, parentHover = false, parentFocus = false, parentActive = false, }) {
    if (rule === "selector" &&
        params === "(> *:not(:first-child))" &&
        nthChild > 1) {
        return true;
    }
    else if (rule === "selector" && params === "(> *)") {
        return true;
    }
    else if (rule === "parent") {
        switch (params) {
            case "hover":
                return parentHover;
            case "focus":
                return parentFocus;
            case "active":
                return parentActive;
            default:
                return false;
        }
    }
    return false;
}
exports.matchChildAtRule = matchChildAtRule;
