export interface WithClassNames {
    className?: string;
    propClassName?: string;
    baseTw?: string;
    twClassName?: string;
    propsToTransform?: string[];
    componentProps: Record<string, unknown>;
    spreadProps?: string[];
    classProps?: string[];
}
export declare function withClassNames({ className, componentProps, propsToTransform, spreadProps, classProps, }: WithClassNames): {
    className: string | undefined;
    allClasses: string;
};
