import { ComponentType, RefAttributes, ClassAttributes, ForwardRefExoticComponent, PropsWithoutRef } from "react";
import { Style } from "../types/common";
export interface StyledOptions<T, P extends keyof T = never, C extends keyof T = never> {
    props?: Partial<Record<P, keyof Style | true>>;
    classProps?: C[];
    baseClassName?: string;
}
export declare type StyledProps<P> = P & {
    className?: string;
    tw?: string;
    baseClassName?: string;
    baseTw?: string;
};
declare type ForwardRef<T, P> = ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
declare type InferRef<T> = T extends RefAttributes<infer R> | ClassAttributes<infer R> ? R : unknown;
/**
 * Default
 */
export declare function styled<T>(Component: ComponentType<T>): ForwardRef<InferRef<T>, StyledProps<T>>;
/**
 * Base className
 */
export declare function styled<T>(Component: ComponentType<T>, baseClassName: string): ForwardRef<InferRef<T>, StyledProps<T>>;
/**
 * Only options
 */
export declare function styled<T, P extends keyof T, C extends keyof T>(Component: ComponentType<T>, options: StyledOptions<T, P, C>): ForwardRef<InferRef<T>, StyledProps<{
    [key in keyof T]: key extends P ? T[key] | string : T[key];
}>>;
/**
 * Base className w/ options
 */
export declare function styled<T, P extends keyof T, C extends keyof T>(Component: ComponentType<T>, baseClassName: string, options: StyledOptions<T, P, C>): ForwardRef<InferRef<T>, StyledProps<{
    [key in keyof T]: key extends P ? T[key] | string : T[key];
}>>;
export {};
