/**
 * Determines if the provided value is a thenable object (i.e., an object with 'then' and 'catch' methods).
 *
 * @param {*} value - The value to check for thenable properties.
 * @returns {boolean} True if the value is a non-null object with 'then' and 'catch' methods; otherwise, false.
 */
const isNonNullObject = require('utils/type_3/isNonNullObject'); // isNonNullObject
const isFunction = require('./eW'); // eW

function isThenableObject(value) {
  // Check that value is not null/undefined and is an object
  if (!value) return false;
  if (!isNonNullObject(value)) return false;

  // Check that value has a 'then' method
  if (!isFunction(value.then)) return false;

  // Check that value has a 'catch' method
  if (!isFunction(value.catch)) return false;

  return true;
}

module.exports = isThenableObject;