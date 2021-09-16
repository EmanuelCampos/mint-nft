export interface Version {
    withMetadata: string;
    withoutMetadata: string;
    linkedWithoutMetadata: string;
}
export declare function getVersion(bytecode: string, linkedBytecode?: string): Version;
export declare function hashBytecode(bytecode: string): string;
export declare function hashBytecodeWithoutMetadata(bytecode: string): string;
//# sourceMappingURL=version.d.ts.map