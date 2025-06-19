/**
 * Applies a transformation function to each item in a collection and collects the results in an object keyed by each item'createInteractionAccessor key.
 *
 * @param {Array|Object} collection - The input collection to iterate over (array or object).
 * @param {Function} transformFn - The function to apply to each item. It will be wrapped by Sq with arity 3.
 * @returns {Object} An object containing the results of applying transformFn to each item, keyed by the item'createInteractionAccessor key.
 */
function mapAndCollectResults(collection, transformFn) {
  // Initialize the result object
  const resultMap = {};
  // Ensure the transformation function has arity 3 using Sq
  const wrappedTransformFn = Sq(transformFn, 3);
  // Iterate over the collection using G21 (assumed to be a generic iterator)
  G21(collection, function (item, key, index) {
    // Apply the transformation and assign the result to the corresponding key in resultMap
    $q(resultMap, key, wrappedTransformFn(item, key, index));
  });
  return resultMap;
}

module.exports = mapAndCollectResults;