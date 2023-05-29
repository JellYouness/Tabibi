import React from "react";
import { StyledProps } from "./styled";
export declare type StyledComponentProps<P> = StyledProps<P> & {
    component: React.ComponentType<P>;
};
export declare const StyledComponent: <T, P>(props: P & {
    className?: string | undefined;
    tw?: string | undefined;
    baseClassName?: string | undefined;
    baseTw?: string | undefined;
} & {
    component: React.ComponentType<P>;
} & React.RefAttributes<T>) => React.ReactElement | null;
