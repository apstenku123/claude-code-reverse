/**
 * Iterates over each item in the source collection, applies a key transformation,
 * and invokes a callback with the transformed key, value, and accumulator.
 *
 * @param {Array|Object} sourceCollection - The collection to iterate over.
 * @param {Function} callback - The function to call for each item. Receives (accumulator, transformedKey, value, index).
 * @param {Function} keyTransformer - Function to transform each key before passing to the callback.
 * @param {any} accumulator - The accumulator object to pass through each callback invocation.
 * @returns {any} The final accumulator after iteration.
 */
function forEachWithTransformedKey(sourceCollection, callback, keyTransformer, accumulator) {
  // The _3 function is assumed to iterate over sourceCollection,
  // calling the provided function with (item, index, extraArg)
  _3(sourceCollection, function (item, index, extraArg) {
    // Apply the key transformation and invoke the callback
    callback(accumulator, keyTransformer(item), index, extraArg);
  });
  return accumulator;
}

module.exports = forEachWithTransformedKey;