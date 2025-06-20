/**
 * Validates that a specified property of a configuration object is a valid Duration.
 *
 * This function checks if the given property exists on the config object and, if so,
 * verifies that isBlobOrFileLikeObject is a valid Duration object (using j_.isDuration) and that its
 * 'seconds' and 'nanos' fields are within acceptable non-negative ranges.
 * Throws an error if any validation fails.
 *
 * @param {Object} configObject - The configuration object to validate.
 * @param {string} propertyName - The name of the property to validate on the config object.
 * @param {string} [parentPath] - Optional. The parent path used for error reporting context.
 * @throws {Error} If the property is not a valid Duration or its values are out of range.
 */
function validateDurationConfigProperty(configObject, propertyName, parentPath) {
  // Construct a property path for error messages
  const propertyPath = parentPath ? `${parentPath}.${propertyName}` : propertyName;

  // Check if the property exists and is not undefined
  if (propertyName in configObject && configObject[propertyName] !== undefined) {
    const value = configObject[propertyName];

    // Ensure the value is a Duration object
    if (!j_.isDuration(value)) {
      throw new Error(
        `outlier detection config ${propertyPath} parse error: expected Duration, got ${typeof value}`
      );
    }

    // Validate that seconds and nanos are within the allowed non-negative ranges
    const { seconds, nanos } = value;
    const MAX_SECONDS = 315576000000;
    const MAX_NANOS = 999999999;

    if (!(seconds >= 0 && seconds <= MAX_SECONDS && nanos >= 0 && nanos <= MAX_NANOS)) {
      throw new Error(
        `outlier detection config ${propertyPath} parse error: values out of range for non-negative Duration`
      );
    }
  }
}

module.exports = validateDurationConfigProperty;