import { Counter } from "../types/contracts/Counter";
export type GasOptions = {
    maxFeePerGas: bigint | undefined;
    maxPriorityFeePerGas: bigint | undefined;
    gasLimit: bigint | undefined;
};
export declare function deployCounter(print: boolean, initCount?: number, gasOpts?: GasOptions): Promise<Counter>;
//# sourceMappingURL=deploySample.d.ts.map