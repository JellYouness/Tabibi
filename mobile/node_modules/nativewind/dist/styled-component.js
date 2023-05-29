"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const styled_1 = require("./styled");
exports.StyledComponent = react_1.default.forwardRef(({ component, ...options }, ref) => {
    const Component = react_1.default.useMemo(() => (0, styled_1.styled)(component), [component]);
    return ((0, jsx_runtime_1.jsx)(Component, { ...options, ref: ref }));
});
