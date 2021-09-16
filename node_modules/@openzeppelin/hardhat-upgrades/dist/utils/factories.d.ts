import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Signer, ContractFactory } from 'ethers';
export declare function getProxyFactory(hre: HardhatRuntimeEnvironment, signer?: Signer): Promise<ContractFactory>;
export declare function getTransparentUpgradeableProxyFactory(hre: HardhatRuntimeEnvironment, signer?: Signer): Promise<ContractFactory>;
export declare function getProxyAdminFactory(hre: HardhatRuntimeEnvironment, signer?: Signer): Promise<ContractFactory>;
//# sourceMappingURL=factories.d.ts.map