/**
 * Retrieves a value from the provided object using a specified key.
 * If the key does not exist, attempts to return the 'all' property of the object.
 * If neither exists, returns 0 as a default value.
 *
 * @param {Object} sourceObject - The object to retrieve the value from.
 * @param {string} propertyKey - The key to look up in the object.
 * @returns {*} The value at the specified key, or the 'all' property, or 0 if neither exists.
 */
function getValueByKeyOrAllOrDefault(sourceObject, propertyKey) {
  // Attempt to retrieve the value by the provided key
  // If not found, fall back to the 'all' property
  // If neither exists, return 0
  return sourceObject[propertyKey] || sourceObject.all || 0;
}

module.exports = getValueByKeyOrAllOrDefault;
