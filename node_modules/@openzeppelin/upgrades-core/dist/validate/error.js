"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrors = void 0;
const chalk_1 = __importDefault(require("chalk"));
const error_1 = require("../error");
class ValidationErrors extends error_1.UpgradesError {
    constructor(contractName, errors) {
        super(`Contract \`${contractName}\` is not upgrade safe`, () => {
            return errors.map(describeError).join('\n\n');
        });
        this.errors = errors;
    }
}
exports.ValidationErrors = ValidationErrors;
const errorInfo = {
    constructor: {
        msg: e => `Contract \`${e.contract}\` has a constructor`,
        hint: () => 'Define an initializer instead',
        link: 'https://zpl.in/upgrades/error-001',
    },
    delegatecall: {
        msg: () => `Use of delegatecall is not allowed`,
        link: 'https://zpl.in/upgrades/error-002',
    },
    selfdestruct: {
        msg: () => `Use of selfdestruct is not allowed`,
        link: 'https://zpl.in/upgrades/error-003',
    },
    'state-variable-assignment': {
        msg: e => `Variable \`${e.name}\` is assigned an initial value`,
        hint: () => 'Move the assignment to the initializer',
        link: 'https://zpl.in/upgrades/error-004',
    },
    'state-variable-immutable': {
        msg: e => `Variable \`${e.name}\` is immutable`,
        hint: () => `Use a constant or mutable variable instead`,
        link: 'https://zpl.in/upgrades/error-005',
    },
    'external-library-linking': {
        msg: e => `Linking external libraries like \`${e.name}\` is not yet supported`,
        hint: () => `Use libraries with internal functions only, or skip this check with the \`unsafeAllowLinkedLibraries\` flag \n` +
            `    if you have manually checked that the libraries are upgrade safe`,
        link: 'https://zpl.in/upgrades/error-006',
    },
    'struct-definition': {
        msg: e => `Structs like \`${e.name}\` are supported in the latest version of the plugin`,
        hint: () => `Update your dependency and run again`,
    },
    'enum-definition': {
        msg: e => `Enums like \`${e.name}\` are supported in the latest version of the plugin`,
        hint: () => `Update your dependency and run again`,
    },
    'missing-public-upgradeto': {
        msg: () => `Implementation is missing a public \`upgradeTo(address)\` function`,
        hint: () => `Inherit UUPSUpgradeable to include this function in your contract\n` +
            `    @openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol`,
        link: 'https://zpl.in/upgrades/error-008',
    },
};
function describeError(e) {
    var _a;
    const info = errorInfo[e.kind];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const log = [chalk_1.default.bold(e.src) + ': ' + info.msg(e)];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hint = (_a = info.hint) === null || _a === void 0 ? void 0 : _a.call(info, e);
    if (hint) {
        log.push(hint);
    }
    if (info.link) {
        log.push(chalk_1.default.dim(info.link));
    }
    return log.join('\n    ');
}
//# sourceMappingURL=error.js.map