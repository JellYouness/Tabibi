export declare type ColorSchemeName = "light" | "dark";
export declare type ColorSchemeSystem = "light" | "dark" | "system";
export declare abstract class ColorSchemeStore {
    colorSchemeListeners: Set<() => void>;
    colorScheme: ColorSchemeName;
    colorSchemeSystem: ColorSchemeSystem;
    constructor();
    abstract notifyMedia(_: string[]): void;
    private notifyColorScheme;
    subscribeColorScheme: (listener: () => void) => () => boolean;
    getColorScheme: () => ColorSchemeName;
    setColorScheme: (colorSchemeSystem: ColorSchemeSystem) => void;
    toggleColorScheme: () => void;
}
