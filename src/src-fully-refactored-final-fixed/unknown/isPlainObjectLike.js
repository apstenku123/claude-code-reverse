/**
 * Determines if a given value is a plain object-like structure.
 *
 * This function checks if the input is an object, has a prototype of null or Object.prototype,
 * and does not have Symbol.toStringTag or Symbol.iterator properties.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a plain object-like structure, false otherwise.
 */
function aLike(value) {
  // Check if the value is of type 'object' (excluding null, arrays, etc.)
  if (V41(value) !== "object") {
    return false;
  }

  // Get the prototype of the value using the provided z$1 function
  const prototype = z$1(value);

  // Check if the prototype is null, Object.prototype, or its prototype is null
  const isPlainProto = (
    prototype === null ||
    prototype === Object.prototype ||
    Object.getPrototypeOf(prototype) === null
  );

  // Ensure the object does NOT have Symbol.toStringTag or Symbol.iterator properties
  const hasNoSpecialSymbols = (
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );

  return isPlainProto && hasNoSpecialSymbols;
}

module.exports = aLike;
