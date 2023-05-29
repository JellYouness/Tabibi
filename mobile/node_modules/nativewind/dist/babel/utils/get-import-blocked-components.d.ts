import { VisitorState } from "../visitor";
import type { NodePath, types } from "@babel/core";
export declare function getImportBlockedComponents(path: NodePath<types.ImportDeclaration>, state: VisitorState): string[];
