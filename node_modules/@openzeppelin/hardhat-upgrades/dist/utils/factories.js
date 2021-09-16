"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProxyAdminFactory = exports.getTransparentUpgradeableProxyFactory = exports.getProxyFactory = void 0;
const ERC1967Proxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json"));
const TransparentUpgradeableProxy_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy.json"));
const ProxyAdmin_json_1 = __importDefault(require("@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol/ProxyAdmin.json"));
async function getProxyFactory(hre, signer) {
    return hre.ethers.getContractFactory(ERC1967Proxy_json_1.default.abi, ERC1967Proxy_json_1.default.bytecode, signer);
}
exports.getProxyFactory = getProxyFactory;
async function getTransparentUpgradeableProxyFactory(hre, signer) {
    return hre.ethers.getContractFactory(TransparentUpgradeableProxy_json_1.default.abi, TransparentUpgradeableProxy_json_1.default.bytecode, signer);
}
exports.getTransparentUpgradeableProxyFactory = getTransparentUpgradeableProxyFactory;
async function getProxyAdminFactory(hre, signer) {
    return hre.ethers.getContractFactory(ProxyAdmin_json_1.default.abi, ProxyAdmin_json_1.default.bytecode, signer);
}
exports.getProxyAdminFactory = getProxyAdminFactory;
//# sourceMappingURL=factories.js.map