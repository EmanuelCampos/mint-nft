"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = void 0;
async function deploy(factory, ...args) {
    const { address, deployTransaction } = await factory.deploy(...args);
    const txHash = deployTransaction.hash;
    return { address, txHash, deployTransaction };
}
exports.deploy = deploy;
//# sourceMappingURL=deploy.js.map