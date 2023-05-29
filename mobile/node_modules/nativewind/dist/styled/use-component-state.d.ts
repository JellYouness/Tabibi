/// <reference types="react" />
export interface ComponentState {
    hover: boolean;
    active: boolean;
    focus: boolean;
}
export declare type Action = {
    type: "hover";
    value: boolean;
} | {
    type: "active";
    value: boolean;
} | {
    type: "focus";
    value: boolean;
};
export declare const useComponentState: () => [{
    hover: boolean;
    active: boolean;
    focus: boolean;
}, import("react").Dispatch<Action>];
