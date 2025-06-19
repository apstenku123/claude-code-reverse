/**
 * Iterates over each item in the source collection, applies a transformation,
 * and invokes a callback with the transformed value and additional arguments.
 *
 * @param {Iterable|Array|Object} sourceCollection - The collection to iterate over.
 * @param {Function} callback - The function to call for each item. Receives (context, transformedValue, originalValue, indexOrKey).
 * @param {Function} transformFn - Function to transform each item before passing to callback.
 * @param {any} context - The context or accumulator to pass to the callback.
 * @returns {any} The context object after iteration.
 */
function forEachTransformedItem(sourceCollection, callback, transformFn, context) {
  // _3 is assumed to be a utility that iterates over sourceCollection,
  // calling the provided function with (item, originalValue, indexOrKey)
  _3(sourceCollection, function (item, originalValue, indexOrKey) {
    // For each item, apply the transformation and invoke the callback
    callback(context, transformFn(item), originalValue, indexOrKey);
  });
  // Return the context (could be an accumulator or similar object)
  return context;
}

module.exports = forEachTransformedItem;