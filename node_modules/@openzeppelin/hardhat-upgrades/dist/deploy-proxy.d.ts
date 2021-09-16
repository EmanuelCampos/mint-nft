import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory, Contract } from 'ethers';
import { ValidationOptions } from '@openzeppelin/upgrades-core';
export interface DeployFunction {
    (ImplFactory: ContractFactory, args?: unknown[], opts?: DeployOptions): Promise<Contract>;
    (ImplFactory: ContractFactory, opts?: DeployOptions): Promise<Contract>;
}
export interface DeployOptions extends ValidationOptions {
    initializer?: string | false;
}
export declare function makeDeployProxy(hre: HardhatRuntimeEnvironment): DeployFunction;
//# sourceMappingURL=deploy-proxy.d.ts.map