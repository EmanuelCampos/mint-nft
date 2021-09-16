export * from './compat';
import { StorageLayout } from './layout';
import { StorageOperation, StorageItem } from './compare';
import { ValidationOptions } from '../validate/overrides';
export declare function assertStorageUpgradeSafe(original: StorageLayout, updated: StorageLayout, unsafeAllowCustomTypes: boolean): void;
export declare function assertStorageUpgradeSafe(original: StorageLayout, updated: StorageLayout, opts: Required<ValidationOptions>): void;
export declare function getStorageUpgradeErrors(original: StorageLayout, updated: StorageLayout, opts?: ValidationOptions): StorageOperation<StorageItem>[];
//# sourceMappingURL=index.d.ts.map