"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSchemeStore = void 0;
const react_native_1 = require("react-native");
class ColorSchemeStore {
    constructor() {
        this.colorSchemeListeners = new Set();
        this.colorScheme = react_native_1.Appearance.getColorScheme() || "light";
        this.colorSchemeSystem = "system";
        this.subscribeColorScheme = (listener) => {
            this.colorSchemeListeners.add(listener);
            return () => this.colorSchemeListeners.delete(listener);
        };
        this.getColorScheme = () => {
            return this.colorScheme;
        };
        this.setColorScheme = (colorSchemeSystem) => {
            const oldColorScheme = this.colorScheme;
            this.colorSchemeSystem = colorSchemeSystem;
            this.colorScheme =
                this.colorSchemeSystem === "system"
                    ? react_native_1.Appearance.getColorScheme() || "light"
                    : this.colorSchemeSystem;
            if (oldColorScheme !== this.colorScheme) {
                this.notifyMedia(["colorScheme"]);
                this.notifyColorScheme();
            }
        };
        this.toggleColorScheme = () => {
            const currentColor = this.colorSchemeSystem === "system"
                ? react_native_1.Appearance.getColorScheme() || "light"
                : this.colorScheme;
            this.colorScheme = currentColor === "light" ? "dark" : "light";
            this.colorSchemeSystem = currentColor;
            this.notifyMedia(["colorScheme"]);
            this.notifyColorScheme();
        };
        try {
            if (typeof localStorage !== "undefined") {
                const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (localStorage.theme === "dark" ||
                    (!("theme" in localStorage) && isDarkMode)) {
                    document.documentElement.classList.add("dark");
                    this.colorScheme = "dark";
                }
                else {
                    document.documentElement.classList.remove("dark");
                    this.colorScheme = "light";
                }
                this.subscribeColorScheme(() => {
                    localStorage.theme = this.colorScheme;
                });
            }
        }
        catch {
            // Just silently fail
        }
    }
    notifyColorScheme() {
        for (const l of this.colorSchemeListeners)
            l();
    }
}
exports.ColorSchemeStore = ColorSchemeStore;
