/**
 * Transforms a collection into an object by applying a mapping function to each item.
 *
 * @param {Array|Object} collection - The collection to iterate over (array or object).
 * @param {Function} iteratee - The function invoked per iteration. Should return the value to assign.
 * @returns {Object} The new object composed of keys from the collection and values returned by the iteratee.
 */
function mapCollectionToObject(collection, iteratee) {
  const resultObject = {};
  // Ensure the iteratee is a function with arity 3
  const mappedIteratee = getConfiguredIteratee(iteratee, 3);
  // Iterate over the collection using the custom _3 function
  _3(collection, function (item, key, index) {
    // Assign the result of the iteratee to the result object using setObjectPropertySafely
    setObjectPropertySafely(resultObject, mappedIteratee(item, key, index), item);
  });
  return resultObject;
}

module.exports = mapCollectionToObject;