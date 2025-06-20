/**
 * Assigns all enumerable own properties from the given source object to the current instance.
 *
 * @param {Object} sourceObject - The object whose properties will be assigned to 'this'.
 * @returns {void}
 *
 * Iterates over the keys of the source object and assigns each property to the current instance.
 * If the source object is falsy, the function does nothing.
 */
function assignPropertiesFromObject(sourceObject) {
  if (sourceObject) {
    // Get all own enumerable property names from the source object
    const propertyNames = Object.keys(sourceObject);
    // Assign each property to the current instance
    for (let index = 0; index < propertyNames.length; ++index) {
      const propertyName = propertyNames[index];
      this[propertyName] = sourceObject[propertyName];
    }
  }
}

module.exports = assignPropertiesFromObject;