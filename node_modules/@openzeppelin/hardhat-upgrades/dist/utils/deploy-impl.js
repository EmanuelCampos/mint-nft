"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployImpl = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const deploy_1 = require("./deploy");
const validations_1 = require("./validations");
async function deployImpl(hre, ImplFactory, requiredOpts, proxyAddress) {
    const { provider } = hre.network;
    const validations = await validations_1.readValidations(hre);
    const unlinkedBytecode = upgrades_core_1.getUnlinkedBytecode(validations, ImplFactory.bytecode);
    const version = upgrades_core_1.getVersion(unlinkedBytecode, ImplFactory.bytecode);
    const layout = upgrades_core_1.getStorageLayout(validations, version);
    upgrades_core_1.assertUpgradeSafe(validations, version, requiredOpts);
    if (proxyAddress !== undefined) {
        const manifest = await upgrades_core_1.Manifest.forNetwork(provider);
        const currentImplAddress = await upgrades_core_1.getImplementationAddress(provider, proxyAddress);
        const currentLayout = await upgrades_core_1.getStorageLayoutForAddress(manifest, validations, currentImplAddress);
        upgrades_core_1.assertStorageUpgradeSafe(currentLayout, layout, requiredOpts);
    }
    return await upgrades_core_1.fetchOrDeploy(version, provider, async () => {
        const deployment = await deploy_1.deploy(ImplFactory);
        return { ...deployment, layout };
    });
}
exports.deployImpl = deployImpl;
//# sourceMappingURL=deploy-impl.js.map