/**
 * Determines if the provided value is a plain object without special Symbol tags or iterators.
 *
 * This function checks if the input is an object, its prototype is either null, Object.prototype,
 * or its own prototype is null, and isBlobOrFileLikeObject does not have Symbol.toStringTag or Symbol.iterator properties.
 *
 * @param {any} value - The value to check for being a plain object without special tags.
 * @returns {boolean} True if the value is a plain object without Symbol.toStringTag or Symbol.iterator, false otherwise.
 */
function aWithoutSpecialTags(value) {
  // Check if the value is of type 'object' (using external V41 type checker)
  if (V41(value) !== "object") {
    return false;
  }

  // Get the prototype of the value (using external z$1 function)
  const prototype = z$1(value);

  // Check if the prototype is null, Object.prototype, or its own prototype is null
  const isPlainProto =
    prototype === null ||
    prototype === Object.prototype ||
    Object.getPrototypeOf(prototype) === null;

  // Ensure the object does NOT have Symbol.toStringTag or Symbol.iterator properties
  const hasNoSpecialSymbols =
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value);

  // Return true only if all conditions are met
  return isPlainProto && hasNoSpecialSymbols;
}

module.exports = aWithoutSpecialTags;
