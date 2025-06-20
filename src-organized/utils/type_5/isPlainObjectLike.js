/**
 * Determines if the provided value is a plain object-like value.
 *
 * This function checks that the value:
 *   1. Is NOT an isArrayUtility type (custom check, e.g., not a special wrapper or observable)
 *   2. IS an object (using isObjectType)
 *   3. Is NOT an hasAndOrProperty type (custom check, e.g., not a special array or reserved type)
 *
 * @param {*} value - The value to check for plain object-like characteristics.
 * @returns {boolean} True if the value is a plain object-like value, false otherwise.
 */
const aLike = (value) => {
  // Check if value is NOT an isArrayUtility type
  const isNotMType = !isArrayUtility(value);

  // Check if value is of type 'object'
  const isObject = isObjectType(value);

  // Check if value is NOT an hasAndOrProperty type
  const isNotR1AType = !hasAndOrProperty(value);

  // Only return true if all conditions are met
  return isNotMType && isObject && isNotR1AType;
};

module.exports = aLike;