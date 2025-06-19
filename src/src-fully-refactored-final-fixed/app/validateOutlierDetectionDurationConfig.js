/**
 * Validates that a given property in a configuration object is a valid Duration for outlier detection.
 * Throws an error if the property exists but is not a valid Duration or is out of the allowed range.
 *
 * @param {Object} configObject - The configuration object containing the property to validate.
 * @param {string} propertyName - The name of the property in the configuration object to validate.
 * @param {string} [parentPath] - Optional parent path for error reporting context.
 * @throws {Error} If the property is not a valid Duration or is out of range.
 */
function validateOutlierDetectionDurationConfig(configObject, propertyName, parentPath) {
  // Construct a descriptive property path for error messages
  const propertyPath = parentPath ? `${parentPath}.${propertyName}` : propertyName;

  // Check if the property exists and is not undefined
  if (propertyName in configObject && configObject[propertyName] !== undefined) {
    const value = configObject[propertyName];

    // Validate that the value is a Duration object using external utility
    if (!j_.isDuration(value)) {
      throw new Error(
        `outlier detection config ${propertyPath} parse error: expected Duration, got ${typeof value}`
      );
    }

    // Validate that the Duration values are within the allowed range
    const { seconds, nanos } = value;
    const MAX_SECONDS = 315576000000;
    const MAX_NANOS = 999999999;
    if (
      !(seconds >= 0 && seconds <= MAX_SECONDS && nanos >= 0 && nanos <= MAX_NANOS)
    ) {
      throw new Error(
        `outlier detection config ${propertyPath} parse error: values out of range for non-negative Duration`
      );
    }
  }
}

module.exports = validateOutlierDetectionDurationConfig;