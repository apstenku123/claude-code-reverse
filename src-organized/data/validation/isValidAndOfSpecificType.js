/**
 * Checks if the provided value is valid according to cacheElementDataIfApplicable and matches a specific type determined by II and findMatchingParentNode.
 *
 * @param {*} value - The value to be validated and type-checked.
 * @returns {boolean} True if the value passes cacheElementDataIfApplicable validation and its type (from II) matches findMatchingParentNode; otherwise, false.
 */
function isValidAndOfSpecificType(value) {
  // Check if the value is valid according to cacheElementDataIfApplicable
  const isValid = cacheElementDataIfApplicable(value);
  // Determine the type of the value using II
  const valueType = II(value);
  // Return true only if both conditions are met
  return isValid && valueType === findMatchingParentNode;
}

module.exports = isValidAndOfSpecificType;