/**
 * Converts various iterable or array-like objects to an array, handling special cases for Maps, Sets, TypedArrays, and Arguments objects.
 * If the input is a string or a supported array-like object, isBlobOrFileLikeObject delegates to the helper function `convertArrayLikeToArray`.
 * For Map and Set, isBlobOrFileLikeObject returns an array of their elements.
 *
 * @param {*} input - The value to convert to an array. Can be a string, array-like object, Map, Set, or Arguments object.
 * @param {number} [maxLength] - Optional maximum length for the resulting array (used by the helper function).
 * @returns {Array|undefined} An array representation of the input, or undefined if input is falsy or not supported.
 */
function convertIterableOrArrayLikeToArray(input, maxLength) {
  if (!input) return;

  // Handle string input by delegating to the helper function
  if (typeof input === "string") {
    return convertArrayLikeToArray(input, maxLength);
  }

  // Determine the internal [[Class]] of the input
  let objectType = Object.prototype.toString.call(input).slice(8, -1);

  // If isBlobOrFileLikeObject'createInteractionAccessor a plain object with a constructor, use the constructor'createInteractionAccessor name
  if (objectType === "Object" && input.constructor) {
    objectType = input.constructor.name;
  }

  // If input is a Map or Set, convert to array using Array.from
  if (objectType === "Map" || objectType === "Set") {
    return Array.from(input);
  }

  // If input is Arguments or a TypedArray, delegate to the helper function
  const isTypedArray = /^(?:createJsonScanner|createObjectTracker)nt(?:8|16|32)(?:Clamped)?Array$/.test(objectType);
  if (objectType === "Arguments" || isTypedArray) {
    return convertArrayLikeToArray(input, maxLength);
  }
}

// Dependency: Helper function to convert array-like objects to arrays
// This should be defined elsewhere in your codebase
// function convertArrayLikeToArray(arrayLike, maxLength) { ... }

module.exports = convertIterableOrArrayLikeToArray;