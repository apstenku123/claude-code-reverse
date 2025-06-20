/**
 * Determines if the given value is an object that is not an array and does not already have an 'AND' or 'OR' property.
 *
 * @param {*} sourceValue - The value to check for eligibility to set 'AND' or 'OR' property.
 * @returns {boolean} True if the value is an object, not an array, and does not have an 'AND' or 'OR' property; otherwise, false.
 */
const isArrayUtility = require('utils/type/isArrayUtility'); // isArrayUtility
const isObjectType = require('utils/type_2/isObjectType');     // isObjectType
const hasAndOrProperty = require('utils/type_4/hasAndOrProperty'); // hasAndOrProperty

function shouldSetAndOrProperty(sourceValue) {
  // Return true if:
  // - sourceValue is NOT an array
  // - sourceValue IS an object
  // - sourceValue does NOT already have an 'AND' or 'OR' property
  return (
    !isArrayUtility(sourceValue) &&
    isObjectType(sourceValue) &&
    !hasAndOrProperty(sourceValue)
  );
}

module.exports = shouldSetAndOrProperty;
