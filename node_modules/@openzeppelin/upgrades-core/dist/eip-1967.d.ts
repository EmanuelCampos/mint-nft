import { EthereumProvider } from './provider';
export declare function getAdminAddress(provider: EthereumProvider, address: string): Promise<string>;
export declare function getImplementationAddress(provider: EthereumProvider, address: string): Promise<string>;
export declare function getBeaconAddress(provider: EthereumProvider, address: string): Promise<string>;
export declare function toFallbackEip1967Hash(label: string): string;
export declare function toEip1967Hash(label: string): string;
//# sourceMappingURL=eip-1967.d.ts.map