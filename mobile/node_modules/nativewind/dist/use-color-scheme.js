"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColorScheme = void 0;
const react_1 = require("react");
const shim_1 = require("use-sync-external-store/shim");
const style_sheet_1 = require("./style-sheet");
function useColorScheme() {
    const store = (0, react_1.useContext)(style_sheet_1.StoreContext);
    const colorScheme = (0, shim_1.useSyncExternalStore)(store.subscribeColorScheme, store.getColorScheme);
    return {
        colorScheme,
        setColorScheme: store.setColorScheme,
        toggleColorScheme: store.toggleColorScheme,
    };
}
exports.useColorScheme = useColorScheme;
