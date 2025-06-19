/**
 * Determines if the provided value is a plain object, excluding values that match certain special types.
 *
 * Specifically, this function returns true if:
 *   - The value is NOT an isPrimitiveOrSpecialObject type
 *   - The value is NOT a UG1 type
 *   - The value is NOT a isFunction type
 *   - The value is of type 'object'
 *
 * @param {*} value - The value to be checked.
 * @returns {boolean} True if the value is a plain object and does not match any excluded types; otherwise, false.
 */
function aExcludingSpecialTypes(value) {
  // Check if value is NOT an isPrimitiveOrSpecialObject type
  const isNotEG1Type = !isPrimitiveOrSpecialObject(value);

  // Check if value is NOT a UG1 type
  const isNotUG1Type = !UG1(value);

  // Check if value is NOT a isFunction type
  const isNotPE0Type = !isFunction(value);

  // Check if value is of type 'object'
  const isObjectType = typeof value === "object";

  // Return true only if all conditions are met
  return isNotEG1Type && isNotUG1Type && isNotPE0Type && isObjectType;
}

module.exports = aExcludingSpecialTypes;