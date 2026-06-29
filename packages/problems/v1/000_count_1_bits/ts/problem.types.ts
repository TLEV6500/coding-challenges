export type CountBits = (num: number) => { count: number; indices: number[] };

export type TestData = {
    [K in `case_${string}`]: {
        input: number;
        expected: { count: number; indices: number[] };
    };
}
