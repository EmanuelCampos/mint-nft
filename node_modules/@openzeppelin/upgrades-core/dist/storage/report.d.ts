import type { StorageOperation, StorageItem } from './compare';
export declare class LayoutCompatibilityReport {
    readonly ops: StorageOperation<StorageItem>[];
    readonly pass: boolean;
    constructor(ops: StorageOperation<StorageItem>[]);
    explain(): string;
}
//# sourceMappingURL=report.d.ts.map