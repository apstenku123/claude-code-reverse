/**
 * Determines if the provided value should have a logical operator property set.
 *
 * The function returns true if:
 *   - The value is NOT an array
 *   - The value IS an object (typeof === 'object' and not null)
 *   - The object does NOT already have a logical operator property (AND/OR)
 *
 * @param {*} value - The value to check for logical operator property eligibility
 * @returns {boolean} True if the logical operator property should be set, false otherwise
 */
function shouldSetLogicalOperatorProperty(value) {
  // Check if value is an array using isArrayUtility
  const isArray = isArrayUtility(value);

  // Check if value is an object (and not null) using isObjectType
  const isObject = isObjectType(value);

  // Check if value already has a logical operator property (AND/OR)
  const hasLogicalOperator = hasLogicalOperatorProperty(value);

  // Return true only if value is a non-array object without logical operator property
  return !isArray && isObject && !hasLogicalOperator;
}

module.exports = shouldSetLogicalOperatorProperty;
