import { Style } from "css-to-react-native";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
export declare type PropertyGuard<T extends string> = (value: string, name: string) => PropertyFunction<T>;
export interface PropertyFunction<T extends string> {
    prop?: T;
    (value: string, name: string): Style;
}
interface OnlyOptions<T extends keyof S, S extends TextStyle | ViewStyle | ImageStyle = TextStyle | ViewStyle | ImageStyle> {
    values?: Array<S[T]>;
    units?: string[];
    number?: boolean;
    color?: boolean;
    auto?: boolean;
}
export declare function noop<T extends string>(): PropertyFunction<T>;
export declare function only<T extends keyof S & string, S extends TextStyle | ViewStyle | ImageStyle = TextStyle | ViewStyle | ImageStyle>(options: Array<S[T]> | OnlyOptions<T, S>): PropertyFunction<T>;
export {};
