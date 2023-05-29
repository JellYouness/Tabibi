export default function memoize<Result, Deps extends readonly any[]>(callback: (...deps: Deps) => Result): (...dependencies: Deps) => Result;
//# sourceMappingURL=memoize.d.ts.map