import { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory } from 'ethers';
import { ValidationOptions } from '@openzeppelin/upgrades-core';
import { ContractAddressOrInstance } from './utils';
export declare type PrepareUpgradeFunction = (proxyAddress: ContractAddressOrInstance, ImplFactory: ContractFactory, opts?: ValidationOptions) => Promise<string>;
export declare function makePrepareUpgrade(hre: HardhatRuntimeEnvironment): PrepareUpgradeFunction;
//# sourceMappingURL=prepare-upgrade.d.ts.map