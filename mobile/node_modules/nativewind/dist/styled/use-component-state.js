"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useComponentState = void 0;
const react_1 = require("react");
const initialState = { hover: false, active: false, focus: false };
function reducer(state, action) {
    switch (action.type) {
        case "hover":
            return { ...state, hover: action.value };
        case "active":
            return { ...state, active: action.value };
        case "focus":
            return { ...state, focus: action.value };
        default:
            throw new Error("Unknown action");
    }
}
const useComponentState = () => (0, react_1.useReducer)(reducer, initialState);
exports.useComponentState = useComponentState;
