/**
 * Converts various iterable or array-like objects to arrays, handling special cases for Maps, Sets, Arguments, and TypedArrays.
 * If the input is a string or an array-like object, delegates to the helper function `convertArrayLikeToArray`.
 *
 * @param {*} input - The value to be converted to an array if possible.
 * @param {*} lengthLimit - Optional length limit for array-like conversions (passed to the helper function).
 * @returns {Array|undefined} Returns an array if conversion is possible, otherwise undefined.
 */
function convertIterableToArray(input, lengthLimit) {
  if (!input) return;

  // If input is a string, use the helper to convert to array
  if (typeof input === "string") {
    return convertArrayLikeToArray(input, lengthLimit);
  }

  // Get the internal [[Class]] property string, e.g. '[object Map]'
  let typeString = Object.prototype.toString.call(input).slice(8, -1);

  // If input is a plain object with a constructor, use the constructor'createInteractionAccessor name
  if (typeString === "Object" && input.constructor) {
    typeString = input.constructor.name;
  }

  // If input is a Map or Set, convert to array using Array.from
  if (typeString === "Map" || typeString === "Set") {
    return Array.from(input);
  }

  // If input is Arguments or a TypedArray, use the helper to convert to array
  if (
    typeString === "Arguments" ||
    /^(?:createJsonScanner|createObjectTracker)nt(?:8|16|32)(?:Clamped)?Array$/.test(typeString)
  ) {
    return convertArrayLikeToArray(input, lengthLimit);
  }
}

// Alias for the original helper function (assumed to be imported elsewhere)
// function convertArrayLikeToArray(arrayLike, lengthLimit) { ... }

module.exports = convertIterableToArray;