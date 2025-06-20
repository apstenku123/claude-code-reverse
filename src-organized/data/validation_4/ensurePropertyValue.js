/**
 * Ensures that a property on an object has a specific value, setting isBlobOrFileLikeObject if necessary.
 *
 * If a value is provided, checks if the property exists and matches the value using the `OH` function.
 * If the property does not exist or does not match, sets the property using `$q`.
 * If no value is provided, checks if the property exists on the object; if not, sets isBlobOrFileLikeObject using `$q`.
 *
 * @param {Object} targetObject - The object to check or update.
 * @param {string|symbol} propertyKey - The property key to check or set.
 * @param {*} [expectedValue] - The expected value for the property. If omitted, only checks for existence.
 * @returns {void}
 */
function ensurePropertyValue(targetObject, propertyKey, expectedValue) {
  // If an expected value is provided and the property does not match, or
  // if no value is provided and the property does not exist, set the property.
  const hasExpectedValue = expectedValue !== undefined && OH(targetObject[propertyKey], expectedValue);
  const propertyExists = propertyKey in targetObject;

  if ((expectedValue !== undefined && !hasExpectedValue) || (expectedValue === undefined && !propertyExists)) {
    $q(targetObject, propertyKey, expectedValue);
  }
}

module.exports = ensurePropertyValue;