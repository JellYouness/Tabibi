"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInteraction = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const selector_1 = require("../utils/selector");
function useInteraction(dispatch, mask, props) {
    const ref = (0, react_1.useRef)(props);
    ref.current = props;
    const handlers = (0, react_1.useMemo)(() => {
        const isParentOrGroup = (0, selector_1.matchesMask)(mask, selector_1.PARENT) || (0, selector_1.matchesMask)(mask, selector_1.GROUP);
        const handlers = {};
        if (isParentOrGroup || (0, selector_1.matchesMask)(mask, selector_1.ACTIVE)) {
            if (react_native_1.Platform.OS === "web") {
                handlers.onMouseDown = function (event) {
                    if (ref.current.onMouseDown) {
                        ref.current.onMouseDown(event);
                    }
                    dispatch({ type: "active", value: true });
                };
                handlers.onMouseUp = function (event) {
                    if (ref.current.onMouseUp) {
                        ref.current.onMouseUp(event);
                    }
                    dispatch({ type: "active", value: false });
                };
            }
            else {
                handlers.onPressIn = function (event) {
                    if (ref.current.onPressIn) {
                        ref.current.onPressIn(event);
                    }
                    dispatch({ type: "active", value: true });
                };
                handlers.onPressOut = function (event) {
                    if (ref.current.onPressOut) {
                        ref.current.onPressOut(event);
                    }
                    dispatch({ type: "active", value: false });
                };
            }
        }
        if (isParentOrGroup || (0, selector_1.matchesMask)(mask, selector_1.HOVER)) {
            handlers.onHoverIn = function (event) {
                if (ref.current.onHoverIn) {
                    ref.current.onHoverIn(event);
                }
                dispatch({ type: "hover", value: true });
            };
            handlers.onHoverOut = function (event) {
                if (ref.current.onHoverIn) {
                    ref.current.onHoverIn(event);
                }
                dispatch({ type: "hover", value: true });
            };
        }
        if (isParentOrGroup || (0, selector_1.matchesMask)(mask, selector_1.FOCUS)) {
            handlers.onFocus = function (event) {
                if (ref.current.onFocus) {
                    ref.current.onFocus(event);
                }
                dispatch({ type: "focus", value: true });
            };
            handlers.onBlur = function (event) {
                if (ref.current.onBlur) {
                    ref.current.onBlur(event);
                }
                dispatch({ type: "focus", value: false });
            };
        }
        return handlers;
    }, [mask]);
    return handlers;
}
exports.useInteraction = useInteraction;
