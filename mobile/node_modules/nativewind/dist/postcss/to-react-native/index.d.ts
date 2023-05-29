import { Declaration } from "postcss";
import { Style } from "css-to-react-native";
import { StyleError } from "../../types/common";
export interface ToReactNativeOptions {
    onError: (options: StyleError) => void;
}
export declare function toReactNative(declaration: Declaration, { onError }: ToReactNativeOptions): Style | undefined;
