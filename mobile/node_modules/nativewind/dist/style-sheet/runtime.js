"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleSheetRuntime = void 0;
const react_native_1 = require("react-native");
const match_at_rule_1 = require("./match-at-rule");
const selector_1 = require("../utils/selector");
const vh_1 = __importDefault(require("./units/vh"));
const vw_1 = __importDefault(require("./units/vw"));
const color_scheme_1 = require("./color-scheme");
const emptyStyles = Object.assign([], { mask: 0 });
const units = {
    vw: vw_1.default,
    vh: vh_1.default,
};
/**
 * Tailwind styles are strings of atomic classes. eg "a b" compiles to [a, b]
 *
 * If the styles are static we can simply cache them and return a stable result
 *
 * However, if the styles are dynamic (have atRules) there are two things we need to do
 *  - Update the atomic style
 *  - Update the dependencies of the atomic style
 *
 * This is performed by each style subscribing to a atRule topic. The atomic styles are updated
 * before the parent styles.
 *
 * The advantage of this system is that styles are only updated once, no matter how many components
 * are on using them
 *
 * The disadvantages are
 * - Is that the store doesn't purge unused styles, so the listeners will continue to grow
 * - UI states (hover/active/focus) are considered separate styles
 *
 * If you are interested in helping me build a more robust store, please create an issue on Github.
 *
 */
class StyleSheetRuntime extends color_scheme_1.ColorSchemeStore {
    constructor() {
        super();
        this.snapshot = { "": emptyStyles };
        this.listeners = new Set();
        this.atRuleListeners = new Set();
        this.styles = {};
        this.atRules = {};
        this.transforms = {};
        this.topics = {};
        this.childClasses = {};
        this.masks = {};
        this.units = {};
        this.preprocessed = false;
        this.platform = react_native_1.Platform.OS;
        this.window = react_native_1.Dimensions.get("window");
        this.orientation = "portrait";
        this.getSnapshot = () => {
            return this.snapshot;
        };
        this.subscribe = (listener) => {
            this.listeners.add(listener);
            return () => this.listeners.delete(listener);
        };
        this.platformSelect = react_native_1.Platform.select;
        this.getPixelSizeForLayoutSize = react_native_1.PixelRatio.getPixelSizeForLayoutSize;
        this.roundToNearestPixel = react_native_1.PixelRatio.getPixelSizeForLayoutSize;
        this.setDimensions(react_native_1.Dimensions);
        this.setAppearance(react_native_1.Appearance);
        this.setPlatform(react_native_1.Platform.OS);
        this.setOutput({
            web: typeof react_native_1.StyleSheet.create({ test: {} }).test !== "number"
                ? "css"
                : "native",
            default: "native",
        });
    }
    setDimensions(dimensions) {
        var _a;
        this.window = dimensions.get("window");
        this.orientation =
            this.window.height >= this.window.width ? "portrait" : "landscape";
        (_a = this.dimensionListener) === null || _a === void 0 ? void 0 : _a.remove();
        this.dimensionListener = dimensions.addEventListener("change", ({ window }) => {
            const topics = ["window"];
            if (window.width !== this.window.width)
                topics.push("width");
            if (window.height !== this.window.height)
                topics.push("height");
            this.window = window;
            const orientation = window.height >= window.width ? "portrait" : "landscape";
            if (orientation !== this.orientation)
                topics.push("orientation");
            this.orientation = orientation;
            this.notifyMedia(topics);
        });
    }
    setAppearance(appearance) {
        var _a;
        (_a = this.appearanceListener) === null || _a === void 0 ? void 0 : _a.remove();
        this.appearanceListener = appearance.addChangeListener(({ colorScheme }) => {
            if (this.colorSchemeSystem === "system") {
                this.colorScheme = colorScheme || "light";
                this.notifyMedia(["colorScheme"]);
            }
        });
    }
    setPlatform(platform) {
        this.platform = platform;
    }
    setOutput(specifics) {
        this.preprocessed = react_native_1.Platform.select(specifics) === "css";
    }
    setDangerouslyCompileStyles(dangerouslyCompileStyles) {
        this.dangerouslyCompileStyles = dangerouslyCompileStyles;
    }
    getServerSnapshot() {
        return this.snapshot;
    }
    destroy() {
        var _a, _b;
        (_a = this.dimensionListener) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = this.appearanceListener) === null || _b === void 0 ? void 0 : _b.remove();
    }
    notify() {
        for (const l of this.listeners)
            l();
    }
    subscribeMedia(listener) {
        this.atRuleListeners.add(listener);
        return () => this.atRuleListeners.delete(listener);
    }
    notifyMedia(topics) {
        for (const l of this.atRuleListeners)
            l(topics);
        this.notify();
    }
    isEqual(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        return a.every((style, index) => Object.is(style, b[index]));
    }
    prepare(composedClassName, options = {}) {
        var _a;
        if (typeof composedClassName !== "string") {
            return "";
        }
        if (this.preprocessed) {
            return this.preparePreprocessed(composedClassName, options);
        }
        const stateBit = (0, selector_1.getStateBit)(options);
        const snapshotKey = `(${composedClassName}).${stateBit}`;
        if (this.snapshot[snapshotKey])
            return snapshotKey;
        (_a = this.dangerouslyCompileStyles) === null || _a === void 0 ? void 0 : _a.call(this, composedClassName, this);
        const classNames = composedClassName.split(/\s+/);
        const topics = new Set();
        for (const className of classNames) {
            if (this.topics[className]) {
                for (const topic of this.topics[className]) {
                    topics.add(topic);
                }
            }
        }
        const childStyles = [];
        const reEvaluate = () => {
            const styleArray = [];
            const transformStyles = [];
            styleArray.mask = 0;
            const stateBit = (0, selector_1.getStateBit)({
                ...options,
                darkMode: this.colorScheme === "dark",
                rtl: react_native_1.I18nManager.isRTL,
                platform: react_native_1.Platform.OS,
            });
            for (const className of classNames) {
                const mask = this.masks[className] || 0;
                styleArray.mask |= mask;
                // If we match this class's state, then process it
                if ((0, selector_1.matchesMask)(stateBit, mask)) {
                    const classNameStyles = this.upsertAtomicStyle(className);
                    // Group transforms
                    if (this.transforms[className]) {
                        for (const a of classNameStyles) {
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            transformStyles.push(...a.transform);
                        }
                    }
                    else {
                        styleArray.push(...classNameStyles);
                    }
                    if (classNameStyles.childClassNames) {
                        childStyles.push(...classNameStyles.childClassNames);
                    }
                }
            }
            if (transformStyles.length > 0) {
                styleArray.push({
                    transform: transformStyles,
                });
            }
            if (styleArray.length > 0 || childStyles.length > 0) {
                if (childStyles.length > 0) {
                    styleArray.childClassNames = childStyles;
                }
                this.snapshot = {
                    ...this.snapshot,
                    [snapshotKey]: styleArray,
                };
            }
            else if (styleArray.mask === 0) {
                this.snapshot = {
                    ...this.snapshot,
                    [snapshotKey]: emptyStyles,
                };
            }
            else {
                this.snapshot = {
                    ...this.snapshot,
                    [snapshotKey]: styleArray,
                };
            }
        };
        reEvaluate();
        if (topics.size > 0) {
            this.subscribeMedia((notificationTopics) => {
                if (notificationTopics.some((topic) => topics.has(topic))) {
                    reEvaluate();
                }
            });
        }
        return snapshotKey;
    }
    preparePreprocessed(className, { isolateGroupActive = false, isolateGroupFocus = false, isolateGroupHover = false, } = {}) {
        if (this.snapshot[className])
            return className;
        const classNames = [className];
        if (isolateGroupActive)
            classNames.push("group-isolate-active");
        if (isolateGroupFocus)
            classNames.push("group-isolate-focus");
        if (isolateGroupHover)
            classNames.push("group-isolate-hover");
        const styleArray = [
            {
                $$css: true,
                [className]: classNames.join(" "),
            },
        ];
        this.snapshot = {
            ...this.snapshot,
            [className]: styleArray,
        };
        return className;
    }
    getStyleArray(className) {
        let styles = this.styles[className];
        /**
         * Some RN platforms still use style ids. Unfortunately this means we cannot
         * support transform or dynamic units.
         *
         * In these cases we need to call flatten on the style to return it to an object.
         *
         * This causes a minor performance issue for these styles, but it should only
         * be a subset
         */
        if (this.units[className] || this.transforms[className]) {
            styles = {
                ...(typeof styles === "number" ? react_native_1.StyleSheet.flatten(styles) : styles),
            };
        }
        if (this.units[className]) {
            for (const [key, value] of Object.entries(styles)) {
                const unitFunction = this.units[className][key]
                    ? units[this.units[className][key]]
                    : undefined;
                if (unitFunction) {
                    styles[key] = unitFunction(value);
                }
            }
        }
        // To keep things consistent, even atomic styles are arrays
        const styleArray = styles ? [styles] : [];
        if (this.childClasses[className]) {
            styleArray.childClassNames = this.childClasses[className];
        }
        return styleArray;
    }
    /**
     * ClassNames are made of multiple atomic styles. eg "a b" are the styles [a, b]
     *
     * This function will be called for each atomic style
     */
    upsertAtomicStyle(className) {
        var _a;
        // This atomic style has already been processed, we can skip it
        if (this.snapshot[className])
            return this.snapshot[className];
        // To keep things consistent, even atomic styles are arrays
        const styleArray = this.getStyleArray(className);
        const atRulesTuple = this.atRules[className];
        // If there are no atRules, this style is static.
        // We can add it to the snapshot and early exit.
        if (!atRulesTuple) {
            this.snapshot =
                styleArray.length > 0 || ((_a = styleArray.childClassNames) === null || _a === void 0 ? void 0 : _a.length)
                    ? { ...this.snapshot, [className]: styleArray }
                    : { ...this.snapshot, [className]: emptyStyles };
            return styleArray;
        }
        // When a topic has new information, this function will be called.
        const reEvaluate = () => {
            var _a;
            const newStyles = [...styleArray];
            for (const [index, atRules] of atRulesTuple.entries()) {
                const atRulesResult = atRules.every(([rule, params]) => {
                    if (rule === "selector") {
                        // These atRules shouldn't be on the atomic styles, they only
                        // apply to childStyles
                        return false;
                    }
                    return (0, match_at_rule_1.matchAtRule)({
                        rule,
                        params,
                        width: this.window.width,
                        height: this.window.height,
                        orientation: this.orientation,
                    });
                });
                if (!atRulesResult) {
                    continue;
                }
                const ruleSelector = (0, selector_1.createAtRuleSelector)(className, index);
                newStyles.push(this.styles[ruleSelector]);
            }
            this.snapshot =
                newStyles.length > 0 || ((_a = newStyles.childClassNames) === null || _a === void 0 ? void 0 : _a.length)
                    ? { ...this.snapshot, [className]: newStyles }
                    : { ...this.snapshot, [className]: emptyStyles };
            return newStyles;
        };
        if (this.topics[className]) {
            const topics = new Set(this.topics[className]);
            this.subscribeMedia((notificationTopics) => {
                if (notificationTopics.some((topic) => topics.has(topic))) {
                    reEvaluate();
                }
            });
        }
        return reEvaluate();
    }
    getChildStyles(parent, options) {
        if (!parent.childClassNames)
            return;
        const styles = [];
        const classNames = new Set();
        for (const className of parent.childClassNames) {
            for (const [index, atRules] of this.atRules[className].entries()) {
                const match = atRules.every(([rule, params]) => {
                    return (0, match_at_rule_1.matchChildAtRule)(rule, params, options);
                });
                const stylesKey = (0, selector_1.createAtRuleSelector)(className, index);
                const style = this.styles[stylesKey];
                if (match && style) {
                    classNames.add(className);
                    styles.push(style);
                }
            }
        }
        if (styles.length === 0) {
            return;
        }
        const className = `${[...classNames].join(" ")}.child`;
        if (this.snapshot[className])
            return this.snapshot[className];
        this.snapshot = { ...this.snapshot, [className]: styles };
        return this.snapshot[className];
    }
    create({ styles, atRules, masks, topics, units, childClasses, transforms, }) {
        if (atRules)
            Object.assign(this.atRules, atRules);
        if (masks)
            Object.assign(this.masks, masks);
        if (topics)
            Object.assign(this.topics, topics);
        if (childClasses)
            Object.assign(this.childClasses, childClasses);
        if (units)
            Object.assign(this.units, units);
        if (transforms)
            Object.assign(this.transforms, transforms);
        if (styles) {
            Object.assign(this.styles, react_native_1.StyleSheet.create(styles));
            for (const className of Object.keys(styles)) {
                this.upsertAtomicStyle(className);
            }
        }
    }
    platformColor(color) {
        // RWN does not implement PlatformColor
        // https://github.com/necolas/react-native-web/issues/2128
        return react_native_1.PlatformColor ? (0, react_native_1.PlatformColor)(color) : color;
    }
    hairlineWidth() {
        return react_native_1.StyleSheet.hairlineWidth;
    }
    pixelRatio(value) {
        var _a;
        const ratio = react_native_1.PixelRatio.get();
        return typeof value === "number" ? ratio * value : (_a = value[ratio]) !== null && _a !== void 0 ? _a : ratio;
    }
    fontScale(value) {
        var _a;
        const scale = react_native_1.PixelRatio.getFontScale();
        return typeof value === "number" ? scale * value : (_a = value[scale]) !== null && _a !== void 0 ? _a : scale;
    }
}
exports.StyleSheetRuntime = StyleSheetRuntime;
