/**
 * Merges multiple input values using a custom reducer function (deepMergeWithCustomRules).
 *
 * The function takes any number of arguments, treats the first as the initial value,
 * and then iteratively merges each subsequent argument into the accumulator using the
 * deepMergeWithCustomRules function. a WeakMap is used as a cache or memoization store for the reducer.
 *
 * @param {...any} values - The values to be merged. The first value is the initial accumulator.
 * @returns {any} The final merged value after applying the reducer to all inputs.
 */
function mergeWithCustomReducer(...values) {
  // Take the first value as the initial accumulator
  let accumulator = values.shift();
  // Create a WeakMap to be used as a cache or memoization store for the reducer
  const reducerCache = new WeakMap();
  // Iteratively merge each value into the accumulator using deepMergeWithCustomRules
  while (values.length > 0) {
    const nextValue = values.shift();
    accumulator = deepMergeWithCustomRules(accumulator, nextValue, 0, reducerCache);
  }
  return accumulator;
}

module.exports = mergeWithCustomReducer;