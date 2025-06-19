/**
 * Determines if the provided value is either a primitive symbol or a Symbol object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a symbol primitive or a Symbol object, false otherwise.
 */
function isSymbolOrSymbolObject(value) {
  // Check if the value is a primitive symbol
  if (typeof value === "symbol") {
    return true;
  }

  // Check if the value is a Symbol object
  // isNonNullObject: Checks if value is object-like and not null
  // UW5: Object.prototype.toString
  // FW5: '[object Symbol]'
  if (isNonNullObject(value) && UW5.call(value) === FW5) {
    return true;
  }

  return false;
}

module.exports = isSymbolOrSymbolObject;