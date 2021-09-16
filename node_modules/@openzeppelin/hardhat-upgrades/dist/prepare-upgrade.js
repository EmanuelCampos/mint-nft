"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePrepareUpgrade = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("./utils");
function makePrepareUpgrade(hre) {
    return async function prepareUpgrade(proxy, ImplFactory, opts = {}) {
        const { provider } = hre.network;
        const proxyAddress = utils_1.getContractAddress(proxy);
        await upgrades_core_1.setProxyKind(provider, proxyAddress, opts);
        return await utils_1.deployImpl(hre, ImplFactory, upgrades_core_1.withValidationDefaults(opts), proxyAddress);
    };
}
exports.makePrepareUpgrade = makePrepareUpgrade;
//# sourceMappingURL=prepare-upgrade.js.map