/**
 * Adds a prefix to all keys of the provided object if their values are truthy, then transforms the result.
 *
 * @param {Object} sourceObject - The object whose keys will be prefixed and filtered by truthy values.
 * @returns {any} The result of passing the prefixed object to the Wc2 transformation function.
 */
function prefixObjectKeysAndTransform(sourceObject) {
  // Return early if input is null or undefined
  if (!sourceObject) return;

  // Prefix to be added to each key (assumed to be defined in the outer scope)
  // Example: const DU1 = 'prefix_';
  // DU1 must be defined for this function to work correctly

  // Create a new object with prefixed keys for truthy values only
  const prefixedObject = Object.entries(sourceObject).reduce((result, [key, value]) => {
    if (value) {
      // Add the prefix to the key and assign the value
      result[`${DU1}${key}`] = value;
    }
    return result;
  }, {});

  // Pass the transformed object to Wc2 for further processing
  return Wc2(prefixedObject);
}

module.exports = prefixObjectKeysAndTransform;