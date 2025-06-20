/**
 * Determines if the provided value is a native symbol or a custom object that mimics a symbol.
 *
 * This function checks if the input is of type 'symbol', or if isBlobOrFileLikeObject passes a custom predicate (isNonNullObject)
 * and its string tag (via UW5.call) matches the expected symbol tag (FW5).
 *
 * @param {*} value - The value to check for symbol or symbol-like characteristics.
 * @returns {boolean} True if the value is a native symbol or a custom symbol-like object; otherwise, false.
 */
function isSymbolOrCustomSymbolLike(value) {
  // Check if value is a native symbol
  if (typeof value === "symbol") {
    return true;
  }

  // Check if value is a custom symbol-like object
  // isNonNullObject: Predicate function to check for custom symbol-like objects
  // UW5: Usually Object.prototype.toString
  // FW5: Expected string tag for symbol (e.g., '[object Symbol]')
  if (isNonNullObject(value) && UW5.call(value) === FW5) {
    return true;
  }

  // Otherwise, not a symbol or symbol-like object
  return false;
}

module.exports = isSymbolOrCustomSymbolLike;