/**
 * Merges multiple input values using a custom handler function, processing each input sequentially.
 *
 * @param {...any} inputs - The list of values to be merged. The first value is used as the initial accumulator.
 * @returns {any} The final merged result after processing all inputs.
 */
function mergeWithCustomHandler(...inputs) {
  // Take the first input as the initial accumulator
  let accumulator = inputs.shift();
  // Create a WeakMap to track processed objects or memoization
  const processedObjects = new WeakMap();

  // Sequentially merge each input into the accumulator using deepMergeWithCustomRules
  while (inputs.length > 0) {
    const nextInput = inputs.shift();
    accumulator = deepMergeWithCustomRules(accumulator, nextInput, 0, processedObjects);
  }

  return accumulator;
}

module.exports = mergeWithCustomHandler;