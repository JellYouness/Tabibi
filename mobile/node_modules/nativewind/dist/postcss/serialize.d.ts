import { ExtractedValues } from "./plugin";
export declare function serializer({ styles: rawStyles, atRules, masks, units, topics, childClasses, transforms, }: ExtractedValues): {
    raw: Partial<ExtractedValues>;
    hasStyles: boolean;
    stylesheetCreateExpression: import("@babel/types").CallExpression;
};
