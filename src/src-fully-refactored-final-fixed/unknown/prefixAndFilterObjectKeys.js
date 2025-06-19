/**
 * Adds a prefix to each key of the input object if its value is truthy, then processes the result.
 *
 * @param {Object} inputObject - The object whose keys will be prefixed and filtered by truthy values.
 * @returns {any} The result of passing the prefixed and filtered object to Wc2.
 */
function prefixAndFilterObjectKeys(inputObject) {
  // Return early if input is null or undefined
  if (!inputObject) return;

  // Build a new object with prefixed keys for truthy values only
  const prefixedObject = Object.entries(inputObject).reduce((result, [key, value]) => {
    if (value) {
      // Prefix each key with DU1 if its value is truthy
      result[`${DU1}${key}`] = value;
    }
    return result;
  }, {});

  // Pass the resulting object to Wc2 and return its result
  return Wc2(prefixedObject);
}

module.exports = prefixAndFilterObjectKeys;