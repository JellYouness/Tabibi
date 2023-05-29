import type { StyledOptions } from ".";
export interface WithStyledPropsOptions<T, P extends keyof T, C extends keyof T> {
    preprocessed: boolean;
    className: string;
    propsToTransform?: StyledOptions<T, P, C>["props"];
    componentProps: Record<P | C | string, string>;
    classProps?: C[];
}
export declare function withStyledProps<T, P extends keyof T, C extends keyof T>({ propsToTransform, componentProps, classProps, preprocessed, className, }: WithStyledPropsOptions<T, P, C>): {
    styledProps: Partial<Record<P | C, unknown>>;
    mask: number;
    className: string;
};
