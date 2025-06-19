/**
 * Determines if the provided value is a plain object that is not a special type.
 *
 * This function checks three conditions:
 *   1. The value is NOT a special type as determined by the isArrayUtility function.
 *   2. The value IS an object type as determined by isObjectType (isObjectType).
 *   3. The value is NOT a restricted object as determined by hasAndOrProperty.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a non-special, non-restricted object; otherwise, false.
 */
const isObjectType = require('./isObjectType'); // isObjectType
const isSpecialType = require('./isArrayUtility'); // isArrayUtility
const isRestrictedObject = require('./hasAndOrProperty'); // hasAndOrProperty

const isNonSpecialObject = (value) => {
  // Return true only if:
  // 1. Value is NOT a special type
  // 2. Value IS an object type
  // 3. Value is NOT a restricted object
  return !isSpecialType(value) && isObjectType(value) && !isRestrictedObject(value);
};

module.exports = isNonSpecialObject;
