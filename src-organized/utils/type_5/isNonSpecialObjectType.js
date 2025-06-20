/**
 * Determines if the provided value is a non-special object type.
 *
 * This function checks that the value:
 *   1. Is NOT a special type as determined by the isArrayUtility function
 *   2. IS an object type (using isObjectType)
 *   3. Is NOT a restricted type as determined by the hasAndOrProperty function
 *
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a non-special object type, false otherwise
 */
const isObjectType = require('utils/type_2/isObjectType'); // isObjectType
const isSpecialType = require('utils/type/isArrayUtility');           // isArrayUtility
const isRestrictedType = require('utils/type_4/hasAndOrProperty');       // hasAndOrProperty

const isNonSpecialObjectType = (value) => {
  // Return true only if:
  // - value is NOT a special type
  // - value IS an object type
  // - value is NOT a restricted type
  return !isSpecialType(value) && isObjectType(value) && !isRestrictedType(value);
};

module.exports = isNonSpecialObjectType;
