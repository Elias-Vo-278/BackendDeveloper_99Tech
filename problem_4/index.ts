// Provide 3 unique implementations of the following function in TypeScript.

/**
 * sum_to_n_a: Using Loop
 * Time complexity: the number of iterations scales linearly with n - O(n)
 * Space complexity:  only a single variable sum - O(1)
 * 
 * sum_to_n_b: Using Formula
 * Time complexity: The formula performs a calculation in constant time - O(1)
 * Space complexity: No extra space is used other than the input and the result - O(1)
 * 
 * sum_to_n_c: Using Recursion
 * Time complexity: The function calls itself n times - O(n)
 * Space complexity: The space usage is proportional to the number of recursive calls - O(n)
 * 
 * 
 * Based on complexity, the optimization ranking of the three functions can be arranged as follows:
 * 	1. sum_to_n_b
 * 	2. sum_to_n_a
 * 	3. sum_to_n_c
 * 
 * However, after testing, it turns out that the best running speed order will be in this arrangement:
 *  1. sum_to_n_a
 * 	2. sum_to_n_b
 * 	3. sum_to_n_c
 * 
 * There are many reasons here, the most obvious one being the influence of hardware, so addition and subtraction operations are more optimal than multiplication and division operations.
 */
import { performance } from 'perf_hooks';

function checkMem(): number {
	const memomry = process.memoryUsage();
	return memomry.heapUsed;
}

function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

function sum_to_n_c(n: number): number {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
}

console.time('Time run B');
console.log("Memory before computation B:");
const initB = checkMem();
console.log('Result: ', sum_to_n_b(50000));
const finalB = checkMem();
console.log(`Memory Used B: ${(finalB - initB) / 1024 / 1024} MB`);
console.timeEnd('Time run B');
console.log('--------------\n');


console.time('Time run A');
console.log("Memory before computation A:");
const initA = checkMem();
console.log('Result: ', sum_to_n_a(50000));
const finalA = checkMem();
console.log(`Memory Used A: ${(finalA - initA) / 1024 / 1024} MB`);
console.timeEnd('Time run A');
console.log('--------------\n');


console.time('Time run C');
console.log("Memory before computation C:");
const initC = checkMem();
console.log('Result: ', sum_to_n_c(50000));
const finalC = checkMem();
console.log(`Memory Used C: ${(finalC - initC) / 1024 / 1024} MB`);
console.timeEnd('Time run C');
console.log('--------------\n');
