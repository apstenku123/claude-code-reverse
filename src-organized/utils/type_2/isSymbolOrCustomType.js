/**
 * Determines if the provided value is either a symbol or matches a specific custom type.
 *
 * This function checks if the input is of type 'symbol', or if isBlobOrFileLikeObject passes a custom predicate (S7)
 * and its type (as determined by nW) matches a specific constant (Xj2).
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} True if the value is a symbol or matches the custom type; otherwise, false.
 */
function isSymbolOrCustomType(value) {
  // Check if the value is a native JavaScript symbol
  if (typeof value === "symbol") {
    return true;
  }

  // Check if the value passes the custom predicate (S7) and matches the custom type (Xj2)
  if (S7(value) && nW(value) === Xj2) {
    return true;
  }

  // Value is neither a symbol nor the custom type
  return false;
}

module.exports = isSymbolOrCustomType;