"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportBlockedComponents = void 0;
const node_module_1 = require("node:module");
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
const micromatch_1 = __importDefault(require("micromatch"));
const platforms_1 = require("../../utils/platforms");
const allowedIndexFiles = [];
for (const platform of platforms_1.platforms) {
    for (const extension of ["js", "jsx", "ts", "tsx"]) {
        allowedIndexFiles.push(`index.${platform}.${extension}`);
    }
}
function getImportBlockedComponents(path, state) {
    const { filename, cwd, allowRelativeModules, allowModuleTransform, opts: { blockModuleTransform = [] }, } = state;
    const require = (0, node_module_1.createRequire)(filename);
    const moduleName = path.node.source.value;
    let modulePaths = [];
    let returnComponentsAsBlocked = false;
    let isNodeModule;
    let isBlocked;
    let isAllowed;
    try {
        modulePaths = [require.resolve(moduleName)];
        isNodeModule = modulePaths[0].includes("node_modules");
    }
    catch {
        /**
         * Hello user! If your are reading this then your probably wondering why your exotic import isn't working.
         *
         * You might be using module-alias, ts-config paths, or importing a folder without an index.{js,jsx,ts,tsx} file
         * either way your doing something that doesn't follow the rules of a normal require statement.
         *
         * Because there's many scenarios, we simply try
         *  - Check if its a file
         *  - Check if its a directory that has an platform specific index files
         *  - Scan the allow/block lists and try and work out if this is a module alias
         */
        const guessAtPath = (0, node_path_1.join)((0, node_path_1.dirname)(filename), moduleName);
        const existsOnFileSystem = (0, node_fs_1.existsSync)(guessAtPath);
        if (existsOnFileSystem) {
            if ((0, node_fs_1.lstatSync)(guessAtPath).isFile()) {
                // Not sure why require would fail if this was a file, but lets account for it anyway
                isNodeModule = false;
                modulePaths.push(guessAtPath);
            }
            else {
                isNodeModule = false;
                for (const file of (0, node_fs_1.readdirSync)(guessAtPath)) {
                    if (allowedIndexFiles.includes((0, node_path_1.basename)(file))) {
                        modulePaths.push((0, node_path_1.join)(guessAtPath, file));
                    }
                }
            }
        }
        else {
            isNodeModule = true;
            isBlocked = micromatch_1.default.isMatch(moduleName, blockModuleTransform);
            isAllowed =
                allowModuleTransform === "*"
                    ? true
                    : micromatch_1.default.isMatch(moduleName, allowModuleTransform);
        }
    }
    if (isNodeModule) {
        isBlocked !== null && isBlocked !== void 0 ? isBlocked : (isBlocked = micromatch_1.default.isMatch(moduleName, blockModuleTransform));
        isAllowed !== null && isAllowed !== void 0 ? isAllowed : (isAllowed = micromatch_1.default.isMatch(moduleName, allowModuleTransform));
        returnComponentsAsBlocked = isBlocked || !isAllowed;
    }
    else {
        const normalizedAllowRelativeModules = !Array.isArray(allowRelativeModules)
            ? []
            : allowRelativeModules.map((modulePath) => (0, node_path_1.resolve)(cwd, modulePath).split(node_path_1.sep).join(node_path_1.posix.sep));
        const isNotAllowedRelative = !modulePaths.some((modulePath) => {
            /**
             * This is my naive way to get path matching working on Windows.
             * Basically I turn it into a posix path which seems to work fine
             *
             * If you are a windows user and understand micromatch, can you please send a PR
             * to do this the proper way
             */
            const posixModulePath = modulePath.split(node_path_1.sep).join(node_path_1.posix.sep);
            return micromatch_1.default.isMatch(posixModulePath, normalizedAllowRelativeModules);
        });
        returnComponentsAsBlocked = isNotAllowedRelative;
    }
    if (!returnComponentsAsBlocked) {
        return [];
    }
    // Only return component names
    return path.node.specifiers.flatMap((specifier) => {
        const name = specifier.local.name;
        if (name[0] === name[0].toUpperCase()) {
            return [name];
        }
        return [];
    });
}
exports.getImportBlockedComponents = getImportBlockedComponents;
