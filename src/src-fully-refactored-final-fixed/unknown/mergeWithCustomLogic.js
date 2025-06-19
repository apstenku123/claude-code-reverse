/**
 * Merges multiple input values using a custom merge function (deepMergeWithCustomRules),
 * maintaining a WeakMap to track merged objects and avoid redundant processing.
 *
 * @param {...any} values - The values to be merged sequentially.
 * @returns {any} The final merged result after applying the custom merge logic to all inputs.
 */
function mergeWithCustomLogic(...values) {
  // Take the first value as the initial merged result
  let mergedResult = values.shift();
  // WeakMap to track already merged objects and prevent redundant merges
  const mergeCache = new WeakMap();

  // Sequentially merge each remaining value into mergedResult
  while (values.length > 0) {
    const nextValue = values.shift();
    mergedResult = deepMergeWithCustomRules(mergedResult, nextValue, 0, mergeCache);
  }

  return mergedResult;
}

module.exports = mergeWithCustomLogic;