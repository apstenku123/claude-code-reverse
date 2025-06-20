/**
 * Generates a key prefix string based on the object'createInteractionAccessor name and storeName properties.
 * If the storeName of the source and target differ, the source'createInteractionAccessor storeName is included in the prefix.
 *
 * @param {Object} source - The source object containing 'name' and 'storeName' properties.
 * @param {Object} target - The target object containing a 'storeName' property for comparison.
 * @returns {string} The generated key prefix string.
 */
function getStoreKeyPrefix(source, target) {
  // Start with the source name followed by a slash
  let keyPrefix = source.name + "/";

  // If the store names differ, append the source'createInteractionAccessor storeName followed by a slash
  if (source.storeName !== target.storeName) {
    keyPrefix += source.storeName + "/";
  }

  return keyPrefix;
}

module.exports = getStoreKeyPrefix;