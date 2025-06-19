/**
 * Checks if a given object matches a set of property conditions.
 *
 * Each condition is an array of the form [propertyKey, expectedValue, isStrict].
 * If 'customizer' is provided, isBlobOrFileLikeObject is used to compare values; otherwise, a default comparison is used.
 *
 * @param {Object} objectToCheck - The object to be tested against the conditions.
 * @param {Object} context - Additional context or configuration (passed to customizer).
 * @param {Array} propertyConditions - Array of property condition arrays: [key, value, isStrict].
 * @param {Function} [customizer] - Optional function to customize value comparison.
 * @returns {boolean} True if all conditions are met, false otherwise.
 */
function matchesPropertyConditions(objectToCheck, context, propertyConditions, customizer) {
  const totalConditions = propertyConditions.length;
  const conditionsCount = totalConditions;
  const isLooseCheck = !customizer;

  // If object is null or undefined, only return true if there are no conditions
  if (objectToCheck == null) return !conditionsCount;

  // Ensure objectToCheck is an object
  const checkedObject = Object(objectToCheck);

  // First pass: quick fail for missing or mismatched properties
  for (let i = totalConditions - 1; i >= 0; i--) {
    const [propertyKey, expectedValue, isStrict] = propertyConditions[i];
    if (isLooseCheck && isStrict) {
      // In loose mode, if strict, check for exact value match
      if (expectedValue !== checkedObject[propertyKey]) return false;
    } else {
      // Otherwise, property must exist
      if (!(propertyKey in checkedObject)) return false;
    }
  }

  // Second pass: deep comparison or custom comparison
  for (let i = 0; i < conditionsCount; i++) {
    const [propertyKey, expectedValue, isStrict] = propertyConditions[i];
    const actualValue = checkedObject[propertyKey];

    if (isLooseCheck && isStrict) {
      // In loose mode, if strict, property must exist (already checked above)
      if (actualValue === undefined && !(propertyKey in checkedObject)) return false;
    } else {
      // Use customizer if provided, otherwise default comparison
      const comparisonContext = new yH();
      let comparisonResult;
      if (customizer) {
        comparisonResult = customizer(actualValue, expectedValue, propertyKey, checkedObject, context, comparisonContext);
      }
      // ky is a default equality checker; Hb2 and zb2 are flags
      if (!(comparisonResult === undefined ? ky(expectedValue, actualValue, Hb2 | zb2, customizer, comparisonContext) : comparisonResult)) {
        return false;
      }
    }
  }

  return true;
}

module.exports = matchesPropertyConditions;