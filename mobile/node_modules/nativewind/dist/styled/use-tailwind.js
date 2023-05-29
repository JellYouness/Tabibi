"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTailwind = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const with_selector_1 = require("use-sync-external-store/shim/with-selector");
const style_sheet_1 = require("../style-sheet");
function useTailwind({ className, inlineStyles, additionalStyles, hover, focus, active, isolateGroupHover, isolateGroupFocus, isolateGroupActive, groupHover, groupFocus, groupActive, flatten, }) {
    const store = (0, react_1.useContext)(style_sheet_1.StoreContext);
    const [subscribe, getSnapshot, selector] = (0, react_1.useMemo)(() => {
        const selector = store.prepare(className, {
            hover,
            focus,
            active,
            isolateGroupHover,
            isolateGroupFocus,
            isolateGroupActive,
            groupHover,
            groupFocus,
            groupActive,
        });
        return [
            store.subscribe,
            store.getSnapshot,
            (snapshot) => snapshot[selector],
        ];
    }, [
        store,
        className,
        hover,
        focus,
        active,
        isolateGroupHover,
        isolateGroupFocus,
        isolateGroupActive,
        groupHover,
        groupFocus,
        groupActive,
    ]);
    const styles = (0, with_selector_1.useSyncExternalStoreWithSelector)(subscribe, getSnapshot, getSnapshot, selector);
    return (0, react_1.useMemo)(() => {
        const stylesArray = [];
        if (styles) {
            stylesArray.push(...styles);
            stylesArray.childClassNames = styles.childClassNames;
        }
        if (additionalStyles) {
            stylesArray.push(...additionalStyles);
        }
        if (inlineStyles) {
            stylesArray.push(inlineStyles);
        }
        if (flatten) {
            const flatStyles = [react_native_1.StyleSheet.flatten(stylesArray)];
            flatStyles.mask = styles === null || styles === void 0 ? void 0 : styles.mask;
            return flatStyles;
        }
        stylesArray.mask = styles === null || styles === void 0 ? void 0 : styles.mask;
        return stylesArray;
    }, [styles, inlineStyles, additionalStyles, flatten]);
}
exports.useTailwind = useTailwind;
