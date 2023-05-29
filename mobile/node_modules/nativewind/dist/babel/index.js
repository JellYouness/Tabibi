"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
const micromatch_1 = __importDefault(require("micromatch"));
const resolveConfigPath_1 = __importDefault(require("tailwindcss/lib/util/resolveConfigPath"));
const resolveConfig_1 = __importDefault(require("tailwindcss/resolveConfig"));
const validateConfig_1 = require("tailwindcss/lib/util/validateConfig");
const helper_module_imports_1 = require("@babel/helper-module-imports");
const extract_styles_1 = require("../postcss/extract-styles");
const visitor_1 = require("./visitor");
const native_1 = require("../tailwind/native");
const types_1 = require("@babel/types");
function default_1(api, options, cwd) {
    var _a, _b, _c;
    /**
     * Get the users config
     */
    const userConfigPath = (0, resolveConfigPath_1.default)(options.tailwindConfig || options.tailwindConfigPath);
    let tailwindConfig;
    if (userConfigPath === null) {
        tailwindConfig = (0, resolveConfig_1.default)({
            ...options.tailwindConfig,
            plugins: [
                (0, native_1.nativePlugin)(options),
                ...((_b = (_a = options === null || options === void 0 ? void 0 : options.tailwindConfig) === null || _a === void 0 ? void 0 : _a.plugins) !== null && _b !== void 0 ? _b : []),
            ],
        });
    }
    else {
        api.cache.using(() => (0, node_fs_1.statSync)(userConfigPath).mtimeMs);
        // eslint-disable-next-line @typescript-eslint/no-var-requires,unicorn/prefer-module
        delete require.cache[require.resolve(userConfigPath)];
        // eslint-disable-next-line @typescript-eslint/no-var-requires,unicorn/prefer-module
        const userConfig = require(userConfigPath);
        const newConfig = (0, resolveConfig_1.default)({
            ...userConfig,
            plugins: [(0, native_1.nativePlugin)(options), ...((_c = userConfig === null || userConfig === void 0 ? void 0 : userConfig.plugins) !== null && _c !== void 0 ? _c : [])],
        });
        tailwindConfig = (0, validateConfig_1.validateConfig)(newConfig);
    }
    /**
     * Resolve their content paths
     */
    const contentFilePaths = (Array.isArray(tailwindConfig.content)
        ? tailwindConfig.content.filter((filePath) => typeof filePath === "string")
        : tailwindConfig.content.files.filter((filePath) => typeof filePath === "string")).map((contentFilePath) => normalizePath((0, node_path_1.resolve)(cwd, contentFilePath)));
    const allowModuleTransform = Array.isArray(options.allowModuleTransform)
        ? ["react-native", "react-native-web", ...options.allowModuleTransform]
        : "*";
    const programVisitor = {
        Program: {
            enter(projectPath, state) {
                const filename = state.filename;
                if (!filename)
                    return;
                const isInContent = micromatch_1.default.isMatch(normalizePath(filename), contentFilePaths);
                if (!isInContent) {
                    return;
                }
                let canCompile = true;
                let canTransform = true;
                switch (state.opts.mode) {
                    case "compileOnly": {
                        canTransform = false;
                        break;
                    }
                    case "transformOnly": {
                        canCompile = false;
                        break;
                    }
                }
                const visitorState = {
                    ...state,
                    rem: 16,
                    didTransform: false,
                    canCompile,
                    canTransform,
                    filename,
                    allowModuleTransform,
                    allowRelativeModules: contentFilePaths,
                    blockList: new Set(),
                    tailwindConfig: tailwindConfig,
                };
                projectPath.traverse(visitor_1.visitor, visitorState);
                const { didTransform } = visitorState;
                if (didTransform) {
                    (0, helper_module_imports_1.addNamed)(projectPath, "StyledComponent", "nativewind");
                }
                if (!canCompile)
                    return;
                // If the file doesn't have any Tailwind styles, it will print a warning
                // We force an empty style to prevent this
                const safelist = tailwindConfig.safelist && tailwindConfig.safelist.length > 0
                    ? tailwindConfig.safelist
                    : ["babel-empty"];
                const output = (0, extract_styles_1.extractStyles)({
                    ...tailwindConfig,
                    content: [filename],
                    safelist,
                });
                if (!output.hasStyles)
                    return;
                projectPath.pushContainer("body", (0, types_1.expressionStatement)(output.stylesheetCreateExpression));
                (0, helper_module_imports_1.addNamed)(projectPath, "NativeWindStyleSheet", "nativewind");
            },
        },
    };
    return {
        visitor: programVisitor,
    };
}
exports.default = default_1;
function normalizePath(filePath) {
    /**
     * This is my naive way to get path matching working on Windows.
     * Basically I turn it into a posix path which seems to work fine
     *
     * If you are a windows user and understand micromatch, can you please send a PR
     * to do this the proper way
     */
    return filePath.split(node_path_1.sep).join(node_path_1.posix.sep);
}
