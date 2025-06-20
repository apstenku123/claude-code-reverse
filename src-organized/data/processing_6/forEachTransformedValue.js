/**
 * Iterates over each value in the source collection, applies a transformation,
 * and invokes a callback with the transformed value and additional arguments.
 *
 * @param {Iterable|Object} sourceCollection - The collection to iterate over.
 * @param {Function} callback - Function to call for each transformed value. Receives (context, transformedValue, originalValue, index).
 * @param {Function} transformFn - Function to transform each item before passing to the callback. Receives (item).
 * @param {any} context - Context or accumulator passed to the callback and returned at the end.
 * @returns {any} The context object after iteration.
 */
function forEachTransformedValue(sourceCollection, callback, transformFn, context) {
  // The _3 function is assumed to iterate over sourceCollection, calling the provided function with (item, originalValue, index)
  _3(sourceCollection, function (item, originalValue, index) {
    // Apply the transformation and invoke the callback
    callback(context, transformFn(item), originalValue, index);
  });
  // Return the context (could be an accumulator or any object)
  return context;
}

module.exports = forEachTransformedValue;