/**
 * Adds a prefix to each key of the provided object if the value is truthy, then processes the result.
 *
 * @param {Object<string, any>} inputObject - The object whose keys will be prefixed and filtered by truthy values.
 * @returns {any} The result of processing the prefixed object with Wc2, or undefined if input is falsy.
 */
function prefixObjectKeysAndProcess(inputObject) {
  if (!inputObject) return;

  // Prefix to add to each key
  const keyPrefix = DU1;

  // Build a new object with prefixed keys for truthy values only
  const prefixedObject = Object.entries(inputObject).reduce((result, [key, value]) => {
    if (value) {
      result[`${keyPrefix}${key}`] = value;
    }
    return result;
  }, {});

  // Process the resulting object with Wc2 and return the result
  return Wc2(prefixedObject);
}

module.exports = prefixObjectKeysAndProcess;