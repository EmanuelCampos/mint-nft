"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNonEnumerable = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeNonEnumerable(obj, key) {
    Object.defineProperty(obj, key, { enumerable: false });
}
exports.makeNonEnumerable = makeNonEnumerable;
//# sourceMappingURL=make-non-enumerable.js.map