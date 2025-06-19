/**
 * Determines if the provided value is a symbol or a symbol-like object.
 *
 * This function checks if the value is of type 'symbol', or if isBlobOrFileLikeObject passes the cacheElementDataIfApplicable predicate
 * and its tag (as determined by getProcessedValue) matches the collectIterableItems symbol tag constant.
 *
 * @param {*} value - The value to check for symbol-ness.
 * @returns {boolean} Returns true if the value is a symbol or symbol-like object, otherwise false.
 */
function isSymbolLike(value) {
  // Check if the value is a primitive symbol
  if (typeof value === "symbol") {
    return true;
  }

  // Check if value is an object that passes cacheElementDataIfApplicable and has the symbol tag
  // cacheElementDataIfApplicable: likely checks if value is object-like
  // getProcessedValue: likely returns the object'createInteractionAccessor tag (e.g., '[object Symbol]')
  // collectIterableItems: the expected symbol tag constant
  if (cacheElementDataIfApplicable(value) && getProcessedValue(value) === collectIterableItems) {
    return true;
  }

  return false;
}

module.exports = isSymbolLike;