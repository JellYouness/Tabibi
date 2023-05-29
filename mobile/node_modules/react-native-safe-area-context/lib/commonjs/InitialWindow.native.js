"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialWindowSafeAreaInsets = exports.initialWindowMetrics = void 0;

var _NativeSafeAreaContext = _interopRequireDefault(require("./specs/NativeSafeAreaContext"));

var _NativeSafeAreaContex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialWindowMetrics = (_NativeSafeAreaContext.default === null || _NativeSafeAreaContext.default === void 0 ? void 0 : (_NativeSafeAreaContex = _NativeSafeAreaContext.default.getConstants()) === null || _NativeSafeAreaContex === void 0 ? void 0 : _NativeSafeAreaContex.initialWindowMetrics) ?? null;
/**
 * @deprecated
 */

exports.initialWindowMetrics = initialWindowMetrics;
const initialWindowSafeAreaInsets = initialWindowMetrics === null || initialWindowMetrics === void 0 ? void 0 : initialWindowMetrics.insets;
exports.initialWindowSafeAreaInsets = initialWindowSafeAreaInsets;
//# sourceMappingURL=InitialWindow.native.js.map