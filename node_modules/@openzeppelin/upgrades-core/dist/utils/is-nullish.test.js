"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const is_nullish_1 = require("./is-nullish");
ava_1.default('null', t => {
    t.true(is_nullish_1.isNullish(null));
});
ava_1.default('undefined', t => {
    t.true(is_nullish_1.isNullish(undefined));
});
ava_1.default('number 5', t => {
    t.false(is_nullish_1.isNullish(5));
});
//# sourceMappingURL=is-nullish.test.js.map