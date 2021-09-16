import { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory, Contract } from 'ethers';
import { ValidationOptions } from '@openzeppelin/upgrades-core';
import { ContractAddressOrInstance } from './utils';
export declare type UpgradeFunction = (proxy: ContractAddressOrInstance, ImplFactory: ContractFactory, opts?: ValidationOptions) => Promise<Contract>;
export declare function makeUpgradeProxy(hre: HardhatRuntimeEnvironment): UpgradeFunction;
//# sourceMappingURL=upgrade-proxy.d.ts.map