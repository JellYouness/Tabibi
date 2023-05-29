import { StyleError } from "../../types/common";
import { Config } from "tailwindcss";
export interface NativePluginOptions {
    rem?: number;
    onError?: (error: StyleError) => void;
}
export declare const nativePlugin: {
    (options: NativePluginOptions): {
        handler: import("tailwindcss/types/config").PluginCreator;
        config?: Config | undefined;
    };
    __isOptionsFunction: true;
};
