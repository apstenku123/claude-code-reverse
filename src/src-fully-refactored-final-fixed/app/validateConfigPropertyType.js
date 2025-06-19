/**
 * Validates that a specific property on a configuration object matches the expected type.
 * Throws an error if the property exists, is not undefined, and its type does not match the expected type.
 *
 * @param {Object} configObject - The object containing the configuration property to validate.
 * @param {string} propertyName - The name of the property to validate on the config object.
 * @param {string} expectedType - The expected JavaScript type of the property (e.g., 'string', 'number').
 * @param {string} [parentPath] - Optional. The parent path to the property, used for error message context.
 * @throws {Error} Throws an error if the property type does not match the expected type.
 */
function validateConfigPropertyType(configObject, propertyName, expectedType, parentPath) {
  // Check if the property exists in the object, is not undefined, and is not of the expected type
  if (
    propertyName in configObject &&
    configObject[propertyName] !== undefined &&
    typeof configObject[propertyName] !== expectedType
  ) {
    // Build the full property path for error reporting
    const fullPropertyPath = parentPath ? `${parentPath}.${propertyName}` : propertyName;
    throw new Error(
      `outlier detection config ${fullPropertyPath} parse error: expected ${expectedType}, got ${typeof configObject[propertyName]}`
    );
  }
}

module.exports = validateConfigPropertyType;