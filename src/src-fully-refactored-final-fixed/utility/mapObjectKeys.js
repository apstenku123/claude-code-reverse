/**
 * Creates a new object by mapping each key-value pair of the source object using a provided iteratee function.
 *
 * @param {Object} sourceObject - The object whose own enumerable properties will be iterated over.
 * @param {Function} iteratee - The function invoked per iteration. Receives (value, key, object).
 * @returns {Object} a new object with keys as the results of the iteratee, and values as the original keys.
 */
function mapObjectKeys(sourceObject, iteratee) {
  const resultObject = {};
  // Ensure the iteratee function has arity of 3 (value, key, object)
  const normalizedIteratee = getConfiguredIteratee(iteratee, 3);
  // Iterate over each property of the source object
  _3(sourceObject, function (value, key, object) {
    // Call the iteratee and use its result as the key in the result object, value is the original key
    setObjectPropertySafely(resultObject, normalizedIteratee(value, key, object), value);
  });
  return resultObject;
}

module.exports = mapObjectKeys;