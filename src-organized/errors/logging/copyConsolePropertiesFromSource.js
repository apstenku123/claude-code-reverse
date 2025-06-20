/**
 * Copies properties from the provided source object to a global 'consoleProperties' object,
 * using the property names that exist in the source object and assigning them from the global 'console' object.
 *
 * @param {Object} sourceProperties - An object whose keys represent the console properties to copy.
 * @returns {void}
 */
function copyConsolePropertiesFromSource(sourceProperties) {
  // Assign the sourceProperties object to a global variable for external reference
  global.consoleSourceProperties = sourceProperties;
  // Initialize a global object to store the copied console properties
  global.consoleProperties = {};

  // Iterate over each property in the sourceProperties object
  for (const propertyName in global.consoleSourceProperties) {
    // Copy the corresponding property from the global console object
    global.consoleProperties[propertyName] = console[propertyName];
  }
}

module.exports = copyConsolePropertiesFromSource;