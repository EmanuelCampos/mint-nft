"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpgradeProxy = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("./utils");
function makeUpgradeProxy(hre) {
    return async function upgradeProxy(proxy, ImplFactory, opts = {}) {
        const { provider } = hre.network;
        const proxyAddress = utils_1.getContractAddress(proxy);
        await upgrades_core_1.setProxyKind(provider, proxyAddress, opts);
        const upgradeTo = await getUpgrader(proxyAddress, ImplFactory.signer);
        const nextImpl = await utils_1.deployImpl(hre, ImplFactory, upgrades_core_1.withValidationDefaults(opts), proxyAddress);
        const upgradeTx = await upgradeTo(nextImpl);
        const inst = ImplFactory.attach(proxyAddress);
        // @ts-ignore Won't be readonly because inst was created through attach.
        inst.deployTransaction = upgradeTx;
        return inst;
    };
    async function getUpgrader(proxyAddress, signer) {
        const { provider } = hre.network;
        const adminAddress = await upgrades_core_1.getAdminAddress(provider, proxyAddress);
        const adminBytecode = await upgrades_core_1.getCode(provider, adminAddress);
        if (adminBytecode === '0x') {
            // No admin contract: use TransparentUpgradeableProxyFactory to get proxiable interface
            const TransparentUpgradeableProxyFactory = await utils_1.getTransparentUpgradeableProxyFactory(hre, signer);
            const proxy = TransparentUpgradeableProxyFactory.attach(proxyAddress);
            return nextImpl => proxy.upgradeTo(nextImpl);
        }
        else {
            // Admin contract: redirect upgrade call through it
            const manifest = await upgrades_core_1.Manifest.forNetwork(provider);
            const AdminFactory = await utils_1.getProxyAdminFactory(hre, signer);
            const admin = AdminFactory.attach(adminAddress);
            const manifestAdmin = await manifest.getAdmin();
            if (admin.address !== (manifestAdmin === null || manifestAdmin === void 0 ? void 0 : manifestAdmin.address)) {
                throw new Error('Proxy admin is not the one registered in the network manifest');
            }
            return nextImpl => admin.upgrade(proxyAddress, nextImpl);
        }
    }
}
exports.makeUpgradeProxy = makeUpgradeProxy;
//# sourceMappingURL=upgrade-proxy.js.map