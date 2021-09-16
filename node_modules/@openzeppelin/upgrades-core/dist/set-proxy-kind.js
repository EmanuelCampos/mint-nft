"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProxyKind = void 0;
const manifest_1 = require("./manifest");
async function setProxyKind(provider, proxyAddress, opts) {
    var _a;
    const manifest = await manifest_1.Manifest.forNetwork(provider);
    const manifestDeployment = await manifest.getProxyFromAddress(proxyAddress).catch(e => {
        if (e instanceof manifest_1.DeploymentNotFound) {
            return undefined;
        }
        else {
            throw e;
        }
    });
    if (opts.kind === undefined) {
        opts.kind = (_a = manifestDeployment === null || manifestDeployment === void 0 ? void 0 : manifestDeployment.kind) !== null && _a !== void 0 ? _a : 'transparent';
    }
    else if (manifestDeployment && opts.kind !== manifestDeployment.kind) {
        throw new Error(`Requested an upgrade of kind ${opts.kind} but proxy is ${manifestDeployment.kind}`);
    }
    return opts.kind;
}
exports.setProxyKind = setProxyKind;
//# sourceMappingURL=set-proxy-kind.js.map