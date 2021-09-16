import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory } from 'ethers';
import { ValidationOptions } from '@openzeppelin/upgrades-core';
export declare function deployImpl(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, requiredOpts: Required<ValidationOptions>, proxyAddress?: string): Promise<string>;
//# sourceMappingURL=deploy-impl.d.ts.map