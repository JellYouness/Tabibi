"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsolateGroupContext = exports.GroupContext = void 0;
const react_1 = require("react");
exports.GroupContext = (0, react_1.createContext)({
    groupHover: false,
    groupFocus: false,
    groupActive: false,
});
exports.IsolateGroupContext = (0, react_1.createContext)({
    isolateGroupHover: false,
    isolateGroupFocus: false,
    isolateGroupActive: false,
});
