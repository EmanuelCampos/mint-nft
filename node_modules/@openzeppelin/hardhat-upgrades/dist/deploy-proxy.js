"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeployProxy = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("./utils");
function makeDeployProxy(hre) {
    return async function deployProxy(ImplFactory, args = [], opts = {}) {
        if (!Array.isArray(args)) {
            opts = args;
            args = [];
        }
        const requiredOpts = upgrades_core_1.withValidationDefaults(opts);
        const { kind } = requiredOpts;
        const { provider } = hre.network;
        const manifest = await upgrades_core_1.Manifest.forNetwork(provider);
        if (kind === 'uups') {
            if (await manifest.getAdmin()) {
                upgrades_core_1.logWarning(`A proxy admin was previously deployed on this network`, [
                    `This is not natively used with the current kind of proxy ('uups').`,
                    `Changes to the admin will have no effect on this new proxy.`,
                ]);
            }
        }
        const impl = await utils_1.deployImpl(hre, ImplFactory, requiredOpts);
        const data = getInitializerData(ImplFactory, args, opts.initializer);
        let proxyDeployment;
        switch (kind) {
            case 'uups': {
                const ProxyFactory = await utils_1.getProxyFactory(hre, ImplFactory.signer);
                proxyDeployment = Object.assign({ kind }, await utils_1.deploy(ProxyFactory, impl, data));
                break;
            }
            case 'transparent': {
                const AdminFactory = await utils_1.getProxyAdminFactory(hre, ImplFactory.signer);
                const adminAddress = await upgrades_core_1.fetchOrDeployAdmin(provider, () => utils_1.deploy(AdminFactory));
                const TransparentUpgradeableProxyFactory = await utils_1.getTransparentUpgradeableProxyFactory(hre, ImplFactory.signer);
                proxyDeployment = Object.assign({ kind }, await utils_1.deploy(TransparentUpgradeableProxyFactory, impl, adminAddress, data));
                break;
            }
        }
        await manifest.addProxy(proxyDeployment);
        const inst = ImplFactory.attach(proxyDeployment.address);
        // @ts-ignore Won't be readonly because inst was created through attach.
        inst.deployTransaction = proxyDeployment.deployTransaction;
        return inst;
    };
    function getInitializerData(ImplFactory, args, initializer) {
        if (initializer === false) {
            return '0x';
        }
        const allowNoInitialization = initializer === undefined && args.length === 0;
        initializer = initializer !== null && initializer !== void 0 ? initializer : 'initialize';
        try {
            const fragment = ImplFactory.interface.getFunction(initializer);
            return ImplFactory.interface.encodeFunctionData(fragment, args);
        }
        catch (e) {
            if (e instanceof Error) {
                if (allowNoInitialization && e.message.includes('no matching function')) {
                    return '0x';
                }
            }
            throw e;
        }
    }
}
exports.makeDeployProxy = makeDeployProxy;
//# sourceMappingURL=deploy-proxy.js.map