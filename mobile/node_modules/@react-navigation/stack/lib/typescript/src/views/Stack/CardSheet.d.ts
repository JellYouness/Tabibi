import * as React from 'react';
import { ViewProps } from 'react-native';
export declare type CardSheetRef = {
    setPointerEvents: React.Dispatch<ViewProps['pointerEvents']>;
};
declare const _default: React.ForwardRefExoticComponent<ViewProps & {
    enabled: boolean;
    layout: {
        width: number;
        height: number;
    };
    children: React.ReactNode;
} & React.RefAttributes<CardSheetRef>>;
export default _default;
//# sourceMappingURL=CardSheet.d.ts.map