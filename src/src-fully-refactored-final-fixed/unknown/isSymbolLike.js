/**
 * Determines if the provided value is a symbol or a symbol-like object.
 *
 * This function checks if the input is a primitive symbol, or if isBlobOrFileLikeObject is an object
 * that passes the isNonNullObject type check and whose internal [[Class]] is '[object Symbol]'.
 *
 * @param {*} value - The value to check for symbol or symbol-like characteristics.
 * @returns {boolean} True if the value is a symbol or symbol-like object, false otherwise.
 */
function isSymbolLike(value) {
  // Check if the value is a primitive symbol
  if (typeof value === "symbol") {
    return true;
  }

  // Check if the value is an object that passes the isNonNullObject type check
  // and its internal [[Class]] is '[object Symbol]'
  const isObjectLike = isNonNullObject(value);
  const isSymbolObject = isObjectLike && L56.call(value) === c66;
  return isSymbolObject;
}

module.exports = isSymbolLike;
