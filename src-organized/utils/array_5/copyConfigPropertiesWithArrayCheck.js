/**
 * Copies properties from the config object to the target object, wrapping values in arrays if specified by the isArray checker.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object} configObject - The source object containing properties to copy.
 * @param {string} propertyPathPrefix - The prefix to use for property paths when calling the isArray checker.
 * @param {Object} arrayChecker - An object with an isArray method to determine if a property should be wrapped in an array.
 * @returns {void}
 */
function copyConfigPropertiesWithArrayCheck(targetObject, configObject, propertyPathPrefix, arrayChecker) {
  if (configObject) {
    const propertyKeys = Object.keys(configObject);
    const totalProperties = propertyKeys.length;
    for (let propertyIndex = 0; propertyIndex < totalProperties; propertyIndex++) {
      const propertyName = propertyKeys[propertyIndex];
      // Use the arrayChecker'createInteractionAccessor isArray method to determine if the property should be wrapped in an array
      if (arrayChecker.isArray(propertyName, propertyPathPrefix + "." + propertyName, true, true)) {
        targetObject[propertyName] = [configObject[propertyName]];
      } else {
        targetObject[propertyName] = configObject[propertyName];
      }
    }
  }
}

module.exports = copyConfigPropertiesWithArrayCheck;