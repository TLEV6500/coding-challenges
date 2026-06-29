import { CountBits } from "@code-exams/problems/v1/000_count_1_bits/ts/problem.types"

const _count = (num: number, data: { count: number, currentIndex: number, indices: number[]}) => {
    if (!num) return;
    _count(Math.trunc(num / 2), data);
    if (num % 2) {
        data.count++
        data.indices.push(data.currentIndex)
    }
    data.currentIndex++
}

const countBits: CountBits = (num) => {
    const data = { count: 0, currentIndex: 0, indices: []}
    _count(num, data)
    delete data.currentIndex
    return data;
};

export default countBits;
