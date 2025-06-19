/**
 * Clears all properties of the provided object by setting their values to undefined.
 *
 * @param {Object} targetObject - The object whose properties will be cleared.
 * @returns {void}
 *
 * This function iterates over all enumerable own properties of the given object
 * and sets each property value to undefined. The object reference remains unchanged.
 */
function clearObjectProperties(targetObject) {
  // Iterate over each property key in the object
  Object.keys(targetObject).forEach(propertyKey => {
    // Set the value of each property to undefined
    targetObject[propertyKey] = undefined;
  });
}

module.exports = clearObjectProperties;