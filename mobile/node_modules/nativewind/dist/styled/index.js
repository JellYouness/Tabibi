"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styled = void 0;
const react_1 = require("react");
const use_interaction_1 = require("./use-interaction");
const with_styled_children_1 = require("./with-styled-children");
const with_styled_props_1 = require("./with-styled-props");
const use_tailwind_1 = require("./use-tailwind");
const style_sheet_1 = require("../style-sheet");
const group_context_1 = require("./group-context");
const use_component_state_1 = require("./use-component-state");
const selector_1 = require("../utils/selector");
/**
 * Actual implementation
 */
function styled(Component, styledBaseClassNameOrOptions, maybeOptions = {}) {
    const { props: propsToTransform, classProps } = typeof styledBaseClassNameOrOptions === "object"
        ? styledBaseClassNameOrOptions
        : maybeOptions;
    const baseClassName = typeof styledBaseClassNameOrOptions === "string"
        ? styledBaseClassNameOrOptions
        : maybeOptions === null || maybeOptions === void 0 ? void 0 : maybeOptions.baseClassName;
    function Styled({ className: propClassName = "", tw: twClassName, style: inlineStyles, children: componentChildren, ...componentProps }, ref) {
        const store = (0, react_1.useContext)(style_sheet_1.StoreContext);
        const groupContext = (0, react_1.useContext)(group_context_1.GroupContext);
        const isolateGroupContext = (0, react_1.useContext)(group_context_1.IsolateGroupContext);
        const classNameWithDefaults = baseClassName
            ? `${baseClassName} ${twClassName !== null && twClassName !== void 0 ? twClassName : propClassName}`
            : twClassName !== null && twClassName !== void 0 ? twClassName : propClassName;
        /**
         * Get the hover/focus/active state of this component
         */
        const [componentState, dispatch] = (0, use_component_state_1.useComponentState)();
        /**
         * Resolve the props/classProps/spreadProps options
         */
        const { styledProps, mask: propsMask, className, } = (0, with_styled_props_1.withStyledProps)({
            className: classNameWithDefaults,
            preprocessed: store.preprocessed,
            propsToTransform,
            classProps,
            componentProps: componentProps,
        });
        /**
         * Resolve the className->style
         */
        const style = (0, use_tailwind_1.useTailwind)({
            className,
            inlineStyles,
            ...componentState,
            ...groupContext,
            ...isolateGroupContext,
        });
        const mask = (style.mask || 0) | propsMask;
        /**
         * Determine if we need event handlers for our styles
         */
        const handlers = (0, use_interaction_1.useInteraction)(dispatch, mask, componentProps);
        /**
         * Resolve the child styles
         */
        const children = (0, with_styled_children_1.withStyledChildren)({
            componentChildren,
            componentState,
            mask,
            store,
            stylesArray: style,
        });
        const element = (0, react_1.createElement)(Component, {
            ...componentProps,
            ...handlers,
            ...styledProps,
            style: style.length > 0 ? style : undefined,
            children,
            ref,
        });
        let returnValue = element;
        if ((0, selector_1.matchesMask)(mask, selector_1.GROUP)) {
            returnValue = (0, react_1.createElement)(group_context_1.GroupContext.Provider, {
                children: returnValue,
                value: {
                    groupHover: groupContext.groupHover || componentState.hover,
                    groupFocus: groupContext.groupFocus || componentState.focus,
                    groupActive: groupContext.groupActive || componentState.active,
                },
            });
        }
        if ((0, selector_1.matchesMask)(mask, selector_1.GROUP_ISO)) {
            returnValue = (0, react_1.createElement)(group_context_1.IsolateGroupContext.Provider, {
                children: returnValue,
                value: {
                    isolateGroupHover: componentState.hover,
                    isolateGroupFocus: componentState.focus,
                    isolateGroupActive: componentState.active,
                },
            });
        }
        return returnValue;
    }
    if (typeof Component !== "string") {
        Styled.displayName = `NativeWind.${Component.displayName || Component.name || "NoName"}`;
    }
    return (0, react_1.forwardRef)(Styled);
}
exports.styled = styled;
