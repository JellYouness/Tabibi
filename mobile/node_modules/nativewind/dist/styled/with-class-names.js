"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withClassNames = void 0;
// const isGroupIsolateRegex = /(?:^|\s)(group-isolate)(?:$|\s)/gi;
// const isParentRegex = /(?:^|\s)(parent)(?:$|\s)/gi;
function withClassNames({ className, componentProps, propsToTransform = [], spreadProps = [], classProps = [], }) {
    // const isGroupIsolate = isGroupIsolateRegex.test(className);
    // const isParent = isParentRegex.test(className);
    const allClasses = [className];
    if (propsToTransform) {
        for (const prop of propsToTransform) {
            const componentProp = componentProps[prop];
            if (typeof componentProp === "string") {
                allClasses.push(componentProp);
            }
        }
    }
    if (spreadProps) {
        for (const prop of spreadProps) {
            const componentProp = componentProps[prop];
            if (typeof componentProp === "string") {
                allClasses.push(componentProp);
            }
        }
    }
    if (classProps) {
        for (const prop of classProps) {
            const componentProp = componentProps[prop];
            if (typeof componentProp === "string") {
                allClasses.push(componentProp);
            }
        }
    }
    return {
        className,
        allClasses: allClasses.join(" "),
    };
}
exports.withClassNames = withClassNames;
