declare namespace Chai {
    interface Assertion {
        closeToBigInt(expected: bigint, tolerance: bigint): Assertion;
    }
}
