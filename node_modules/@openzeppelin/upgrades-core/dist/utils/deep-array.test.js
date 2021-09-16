"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const deep_array_1 = require("./deep-array");
ava_1.default('depth 0', t => {
    t.true(deep_array_1.deepEqual('a', 'a'));
    t.false(deep_array_1.deepEqual('a', 'b'));
    t.false(deep_array_1.deepEqual('a', ['a']));
    t.false(deep_array_1.deepEqual(['a'], 'a'));
});
ava_1.default('depth 1', t => {
    t.true(deep_array_1.deepEqual(['a', 'b'], ['a', 'b']));
    t.false(deep_array_1.deepEqual(['a'], ['a', 'b']));
    t.false(deep_array_1.deepEqual(['a', 'b'], ['a', 'c']));
});
ava_1.default('depth 2', t => {
    t.true(deep_array_1.deepEqual([['a'], ['b']], [['a'], ['b']]));
    t.false(deep_array_1.deepEqual([['a'], ['b']], [['a'], ['c']]));
});
//# sourceMappingURL=deep-array.test.js.map