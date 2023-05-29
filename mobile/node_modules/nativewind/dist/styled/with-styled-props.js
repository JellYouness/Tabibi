"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStyledProps = void 0;
const use_tailwind_1 = require("./use-tailwind");
function withStyledProps({ propsToTransform, componentProps, classProps, preprocessed, className, }) {
    const styledProps = {};
    let mask = 0;
    if (classProps) {
        if (preprocessed) {
            for (const prop of classProps) {
                styledProps[prop] = undefined;
                className += ` ${componentProps[prop]}`;
            }
        }
        else {
            for (const prop of classProps) {
                const style = (0, use_tailwind_1.useTailwind)({
                    className: componentProps[prop],
                    flatten: true,
                });
                if (style.mask) {
                    mask |= style.mask;
                }
                Object.assign(styledProps, { [prop]: undefined }, style[0]);
            }
        }
    }
    if (propsToTransform && !preprocessed) {
        for (const [prop, styleKey] of Object.entries(propsToTransform)) {
            const styleArray = (0, use_tailwind_1.useTailwind)({
                className: componentProps[prop],
                flatten: styleKey !== true,
            });
            if (styleArray.length === 0) {
                continue;
            }
            if (styleArray.mask) {
                mask |= styleArray.mask;
            }
            if (typeof styleKey === "boolean") {
                styledProps[prop] = styleArray;
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                styledProps[prop] = styleArray[0][styleKey];
            }
        }
    }
    return { styledProps, mask, className };
}
exports.withStyledProps = withStyledProps;
