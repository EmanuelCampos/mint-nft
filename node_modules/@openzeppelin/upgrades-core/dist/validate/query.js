"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUpgradeSafe = exports.getErrors = exports.getUnlinkedBytecode = exports.findVersionWithoutMetadataMatches = exports.unfoldStorageLayout = exports.getStorageLayout = exports.getContractNameAndRunValidation = exports.getContractVersion = exports.assertUpgradeSafe = void 0;
const version_1 = require("../version");
const link_refs_1 = require("../link-refs");
const overrides_1 = require("./overrides");
const error_1 = require("./error");
const data_1 = require("./data");
function assertUpgradeSafe(data, version, opts) {
    const dataV3 = data_1.normalizeValidationData(data);
    const [contractName] = getContractNameAndRunValidation(dataV3, version);
    let errors = getErrors(dataV3, version);
    errors = overrides_1.processExceptions(contractName, errors, opts);
    if (errors.length > 0) {
        throw new error_1.ValidationErrors(contractName, errors);
    }
}
exports.assertUpgradeSafe = assertUpgradeSafe;
function getContractVersion(runData, contractName) {
    const { version } = runData[contractName];
    if (version === undefined) {
        throw new Error(`Contract ${contractName} is abstract`);
    }
    return version;
}
exports.getContractVersion = getContractVersion;
function getContractNameAndRunValidation(data, version) {
    const dataV3 = data_1.normalizeValidationData(data);
    let runValidation;
    let contractName;
    for (const validation of dataV3.log) {
        contractName = Object.keys(validation).find(name => { var _a; return ((_a = validation[name].version) === null || _a === void 0 ? void 0 : _a.withMetadata) === version.withMetadata; });
        if (contractName !== undefined) {
            runValidation = validation;
            break;
        }
    }
    if (contractName === undefined || runValidation === undefined) {
        throw new Error('The requested contract was not found. Make sure the source code is available for compilation');
    }
    return [contractName, runValidation];
}
exports.getContractNameAndRunValidation = getContractNameAndRunValidation;
function getStorageLayout(data, version) {
    const dataV3 = data_1.normalizeValidationData(data);
    const [contractName, runValidation] = getContractNameAndRunValidation(dataV3, version);
    return unfoldStorageLayout(runValidation, contractName);
}
exports.getStorageLayout = getStorageLayout;
function unfoldStorageLayout(runData, contractName) {
    const c = runData[contractName];
    const layout = { storage: [], types: {} };
    for (const name of [contractName].concat(c.inherit)) {
        layout.storage.unshift(...runData[name].layout.storage);
        Object.assign(layout.types, runData[name].layout.types);
    }
    return layout;
}
exports.unfoldStorageLayout = unfoldStorageLayout;
function* findVersionWithoutMetadataMatches(data, versionWithoutMetadata) {
    var _a;
    const dataV3 = data_1.normalizeValidationData(data);
    for (const validation of dataV3.log) {
        for (const contractName in validation) {
            if (((_a = validation[contractName].version) === null || _a === void 0 ? void 0 : _a.withoutMetadata) === versionWithoutMetadata) {
                yield [contractName, validation];
            }
        }
    }
}
exports.findVersionWithoutMetadataMatches = findVersionWithoutMetadataMatches;
function getUnlinkedBytecode(data, bytecode) {
    var _a;
    const dataV3 = data_1.normalizeValidationData(data);
    for (const validation of dataV3.log) {
        const linkableContracts = Object.keys(validation).filter(name => validation[name].linkReferences.length > 0);
        for (const name of linkableContracts) {
            const { linkReferences } = validation[name];
            const unlinkedBytecode = link_refs_1.unlinkBytecode(bytecode, linkReferences);
            const version = version_1.getVersion(unlinkedBytecode);
            if (((_a = validation[name].version) === null || _a === void 0 ? void 0 : _a.withMetadata) === version.withMetadata) {
                return unlinkedBytecode;
            }
        }
    }
    return bytecode;
}
exports.getUnlinkedBytecode = getUnlinkedBytecode;
function getErrors(data, version) {
    const dataV3 = data_1.normalizeValidationData(data);
    const [contractName, runValidation] = getContractNameAndRunValidation(dataV3, version);
    const c = runValidation[contractName];
    const errors = c.errors
        .concat(...c.inherit.map(name => runValidation[name].errors))
        .concat(...c.libraries.map(name => runValidation[name].errors));
    const selfAndInheritedMethods = c.methods.concat(...c.inherit.map(name => runValidation[name].methods));
    if (!selfAndInheritedMethods.includes('upgradeTo(address)')) {
        errors.push({
            src: c.src,
            kind: 'missing-public-upgradeto',
        });
    }
    return errors;
}
exports.getErrors = getErrors;
function isUpgradeSafe(data, version) {
    const dataV3 = data_1.normalizeValidationData(data);
    return getErrors(dataV3, version).length == 0;
}
exports.isUpgradeSafe = isUpgradeSafe;
//# sourceMappingURL=query.js.map