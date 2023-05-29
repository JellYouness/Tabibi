interface MatchAtRuleOptions {
    rule: string;
    params?: string;
    width: number;
    height: number;
    orientation: OrientationLockType;
}
export declare function matchAtRule({ rule, params, width, height, orientation, }: MatchAtRuleOptions): boolean;
export interface MatchChildAtRuleOptions {
    nthChild?: number;
    parentHover?: boolean;
    parentFocus?: boolean;
    parentActive?: boolean;
}
export declare function matchChildAtRule(rule: string, params: string | undefined, { nthChild, parentHover, parentFocus, parentActive, }: MatchChildAtRuleOptions): boolean;
export {};
