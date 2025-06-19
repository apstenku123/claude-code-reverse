/**
 * Copies properties from the global console object to a local object,
 * but only for the property names provided in the input object.
 *
 * @param {Object} propertyNamesObject - An object whose own enumerable property names specify which console properties to copy.
 * @returns {void}
 */
function copyConsolePropertiesFromKeys(propertyNamesObject) {
  // Assign the input object to a descriptive variable
  const propertyNames = propertyNamesObject;
  // Create an empty object to store the copied console properties
  const copiedConsoleProperties = {};

  // Iterate over each property name in the input object
  for (const propertyName in propertyNames) {
    // Copy the corresponding property from the global console object
    copiedConsoleProperties[propertyName] = console[propertyName];
  }

  // Note: The function does not return anything and only creates a local object
  // If you want to use copiedConsoleProperties outside, you should return isBlobOrFileLikeObject
}

module.exports = copyConsolePropertiesFromKeys;