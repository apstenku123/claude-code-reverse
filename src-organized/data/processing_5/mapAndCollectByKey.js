/**
 * Applies a transformation function to each item in a collection and collects the results in an object keyed by a specific property.
 *
 * @param {Array|Object} collection - The collection to iterate over (array or object).
 * @param {Function} transformFn - The function to apply to each item. Will be wrapped by Sq with arity 3.
 * @returns {Object} An object where each key is derived from the iteration and each value is the result of the transformation function.
 */
function mapAndCollectByKey(collection, transformFn) {
  const resultObject = {};
  // Ensure transformFn is wrapped to accept 3 arguments
  const wrappedTransformFn = Sq(transformFn, 3);
  // Iterate over the collection using G21 (likely a forEach-like utility)
  G21(collection, function (item, key, index) {
    // Apply the transformation and assign to the result object using $q (likely a safe setter)
    $q(resultObject, key, wrappedTransformFn(item, key, index));
  });
  return resultObject;
}

module.exports = mapAndCollectByKey;