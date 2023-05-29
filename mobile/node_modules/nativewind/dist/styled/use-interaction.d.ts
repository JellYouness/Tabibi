import { Dispatch } from "react";
import { PressableProps } from "react-native";
import { Action } from "./use-component-state";
declare module "react-native" {
    interface PressableProps {
        onHoverIn?: ((event: MouseEvent) => void) | null;
        onHoverOut?: ((event: MouseEvent) => void) | null;
    }
}
export interface InteractionProps extends PressableProps {
    onMouseDown?: PressableProps["onPressIn"];
    onMouseUp?: PressableProps["onPressOut"];
}
export declare function useInteraction(dispatch: Dispatch<Action>, mask: number, props: InteractionProps): InteractionProps;
