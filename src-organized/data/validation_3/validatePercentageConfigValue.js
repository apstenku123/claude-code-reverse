/**
 * Validates that a given property in a configuration object is a number between 0 and 100 (inclusive).
 * Throws an error if the value is out of range or not defined.
 *
 * @param {Object} configObject - The configuration object containing the value to validate.
 * @param {string} propertyName - The name of the property to validate within the configuration object.
 * @param {string} [parentKey] - Optional parent key for nested configuration, used for error message context.
 * @throws {Error} If the property value is not within the range 0-100 (inclusive).
 */
function validatePercentageConfigValue(configObject, propertyName, parentKey) {
  // Construct a descriptive key for error messages, including parentKey if provided
  const configKey = parentKey ? `${parentKey}.${propertyName}` : propertyName;

  // Call external type-checking/validation function (assumed to throw if invalid)
  validateConfigPropertyType(configObject, propertyName, "number", parentKey);

  // Check if the property exists and is defined
  if (
    propertyName in configObject &&
    configObject[propertyName] !== undefined &&
    // Ensure the value is within the allowed percentage range
    !(configObject[propertyName] >= 0 && configObject[propertyName] <= 100)
  ) {
    throw new Error(
      `outlier detection config ${configKey} parse error: value out of range for percentage (0-100)`
    );
  }
}

module.exports = validatePercentageConfigValue;