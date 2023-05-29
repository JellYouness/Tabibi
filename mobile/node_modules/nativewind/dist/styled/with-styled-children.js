"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStyledChildren = void 0;
const react_1 = require("react");
const react_is_1 = require("react-is");
const selector_1 = require("../utils/selector");
function withStyledChildren({ componentChildren, componentState, mask, store, stylesArray, }) {
    const isParent = (0, selector_1.matchesMask)(mask, selector_1.PARENT);
    if (!stylesArray.childClassNames && !isParent) {
        return componentChildren;
    }
    const children = (0, react_is_1.isFragment)(componentChildren)
        ? // This probably needs to be recursive
            componentChildren.props.children
        : componentChildren;
    return react_1.Children.toArray(children)
        .filter(Boolean)
        .map((child, index) => {
        if (!(0, react_1.isValidElement)(child)) {
            return child;
        }
        const style = store.getChildStyles(stylesArray, {
            nthChild: index + 1,
            parentHover: componentState.hover,
            parentFocus: componentState.focus,
            parentActive: componentState.active,
        });
        if (!style || style.length === 0) {
            return child;
        }
        return child.props.style
            ? (0, react_1.cloneElement)(child, { style: [child.props.style, style] })
            : (0, react_1.cloneElement)(child, { style });
    });
}
exports.withStyledChildren = withStyledChildren;
