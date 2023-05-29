import { StyleProp } from "react-native";
import { StylesArray } from "../style-sheet";
import { Style } from "../style-sheet/runtime";
import { StateBitOptions } from "../utils/selector";
export interface UseTailwindOptions<T extends Style> extends StateBitOptions {
    className: string;
    inlineStyles?: StyleProp<T>;
    additionalStyles?: StylesArray<T>;
    flatten?: boolean;
}
export declare function useTailwind<T extends Style>({ className, inlineStyles, additionalStyles, hover, focus, active, isolateGroupHover, isolateGroupFocus, isolateGroupActive, groupHover, groupFocus, groupActive, flatten, }: UseTailwindOptions<T>): StylesArray<T>;
