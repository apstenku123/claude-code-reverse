/**
 * Assigns properties from the config object to the target object, wrapping values in arrays if specified by a custom isArray check.
 *
 * @param {Object} targetObject - The object to which properties will be assigned.
 * @param {Object} configObject - The source object containing properties to assign.
 * @param {string} propertyPathPrefix - The prefix to use when constructing the property path for the isArray check.
 * @param {Object} arrayCheckHelper - An object containing the isArray method for determining if a property should be wrapped in an array.
 * @returns {void}
 */
function assignConfigPropertiesWithArrayCheck(targetObject, configObject, propertyPathPrefix, arrayCheckHelper) {
  if (configObject) {
    // Get all property names from the config object
    const configKeys = Object.keys(configObject);
    const totalKeys = configKeys.length;
    
    // Iterate over each property in the config object
    for (let keyIndex = 0; keyIndex < totalKeys; keyIndex++) {
      const propertyName = configKeys[keyIndex];
      // Determine if the property should be wrapped in an array using the isArray method
      if (arrayCheckHelper.isArray(propertyName, propertyPathPrefix + "." + propertyName, true, true)) {
        targetObject[propertyName] = [configObject[propertyName]];
      } else {
        targetObject[propertyName] = configObject[propertyName];
      }
    }
  }
}

module.exports = assignConfigPropertiesWithArrayCheck;