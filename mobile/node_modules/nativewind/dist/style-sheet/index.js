"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreContext = exports.NativeWindStyleSheet = exports.StyleSheetRuntime = void 0;
const react_1 = require("react");
const runtime_1 = require("./runtime");
var runtime_2 = require("./runtime");
Object.defineProperty(exports, "StyleSheetRuntime", { enumerable: true, get: function () { return runtime_2.StyleSheetRuntime; } });
const runtime = new runtime_1.StyleSheetRuntime();
exports.NativeWindStyleSheet = {
    create: runtime.create.bind(runtime),
    setDimensions: runtime.setDimensions.bind(runtime),
    setAppearance: runtime.setAppearance.bind(runtime),
    setPlatform: runtime.setPlatform.bind(runtime),
    setOutput: runtime.setOutput.bind(runtime),
    setColorScheme: runtime.setColorScheme.bind(runtime),
    platformSelect: runtime.platformSelect.bind(runtime),
    platformColor: runtime.platformColor.bind(runtime),
    hairlineWidth: runtime.hairlineWidth.bind(runtime),
    pixelRatio: runtime.pixelRatio.bind(runtime),
    fontScale: runtime.fontScale.bind(runtime),
    getPixelSizeForLayoutSize: runtime.getPixelSizeForLayoutSize.bind(runtime),
    roundToNearestPixel: runtime.roundToNearestPixel.bind(runtime),
    setDangerouslyCompileStyles: runtime.setDangerouslyCompileStyles.bind(runtime),
};
// We add this to a context so its overridable in tests
exports.StoreContext = (0, react_1.createContext)(runtime);
