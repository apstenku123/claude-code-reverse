/**
 * Checks if a given object matches a set of property criteria, with optional custom comparison logic.
 *
 * @param {Object} objectToCheck - The object to validate against the criteria.
 * @param {Object} context - An optional context object passed to customizer.
 * @param {Array} criteriaList - An array of criteria arrays: [propertyKey, expectedValue, isStrict].
 * @param {Function} [customizer] - Optional custom comparison function (value, expected, key, object, context, stack).
 * @returns {boolean} True if the object matches all criteria, false otherwise.
 */
function doesObjectMatchCriteria(objectToCheck, context, criteriaList, customizer) {
  const criteriaCount = criteriaList.length;
  const totalCriteria = criteriaCount;
  // If customizer is not provided, perform strict comparison
  const isStrictComparison = !customizer;

  // If object is null or undefined, only match if there are no criteria
  if (objectToCheck == null) return !totalCriteria;

  // Ensure objectToCheck is an object
  objectToCheck = Object(objectToCheck);

  // First pass: quick property existence and strict value checks
  let index = criteriaCount;
  while (index--) {
    const [propertyKey, expectedValue, isStrict] = criteriaList[index];
    if (isStrictComparison && isStrict) {
      // Strict: property must exist and match expected value
      if (expectedValue !== objectToCheck[propertyKey]) return false;
    } else {
      // Non-strict: property must exist
      if (!(propertyKey in objectToCheck)) return false;
    }
  }

  // Second pass: deep comparison or customizer logic
  index++;
  while (index < totalCriteria) {
    const [propertyKey, expectedValue, isStrict] = criteriaList[index];
    const actualValue = objectToCheck[propertyKey];
    if (isStrictComparison && isStrict) {
      // Strict: property must exist (even if value is undefined)
      if (actualValue === undefined && !(propertyKey in objectToCheck)) return false;
    } else {
      // Use customizer if provided, otherwise fallback to default deep equality
      const comparisonStack = new yH();
      let comparisonResult;
      if (customizer) {
        comparisonResult = customizer(actualValue, expectedValue, propertyKey, objectToCheck, context, comparisonStack);
      }
      if (!(comparisonResult === undefined ? ky(expectedValue, actualValue, Hb2 | zb2, customizer, comparisonStack) : comparisonResult)) {
        return false;
      }
    }
    index++;
  }

  return true;
}

module.exports = doesObjectMatchCriteria;