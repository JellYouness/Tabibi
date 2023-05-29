import { ReactNode } from "react";
import { StylesArray, StyleSheetRuntime } from "../style-sheet";
import { ComponentState } from "./use-component-state";
export interface WithStyledChildrenOptions {
    componentChildren: ReactNode;
    store: StyleSheetRuntime;
    stylesArray: StylesArray<any>;
    mask: number;
    componentState: ComponentState;
}
export declare function withStyledChildren({ componentChildren, componentState, mask, store, stylesArray, }: WithStyledChildrenOptions): ReactNode;
