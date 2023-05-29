import { ImageStyle, TextStyle, ViewStyle } from "react-native";
export declare type StyleProperty = keyof TextStyle | keyof ViewStyle | keyof ImageStyle
/**
 * These are special SVG properties that we support
 */
 | "fill" | "stroke" | "strokeWidth";
export declare function isInvalidProperty(property: string): boolean;
