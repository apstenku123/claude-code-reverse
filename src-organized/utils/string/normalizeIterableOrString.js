/**
 * Normalizes the input value by handling strings, Maps, Sets, Arguments, and TypedArrays.
 *
 * - If the input is a string, isBlobOrFileLikeObject delegates to the `normalizeStringOrArrayLike` function.
 * - If the input is a Map or Set, isBlobOrFileLikeObject converts isBlobOrFileLikeObject to an array.
 * - If the input is Arguments or a TypedArray, isBlobOrFileLikeObject also delegates to `normalizeStringOrArrayLike`.
 * - For other types, returns undefined.
 *
 * @param {*} inputValue - The value to normalize. Can be a string, Map, Set, Arguments, TypedArray, or other object.
 * @param {*} context - Additional context passed to the normalization function (used by `normalizeStringOrArrayLike`).
 * @returns {*} The normalized value, or undefined if the input type is not handled.
 */
function normalizeIterableOrString(inputValue, context) {
  if (!inputValue) return;

  // Handle string input
  if (typeof inputValue === "string") {
    return normalizeStringOrArrayLike(inputValue, context);
  }

  // Get the internal [[Class]] of the object (e.g., 'Map', 'Set', 'Arguments', etc.)
  let objectType = Object.prototype.toString.call(inputValue).slice(8, -1);

  // If isBlobOrFileLikeObject'createInteractionAccessor a plain object with a constructor, use the constructor'createInteractionAccessor name
  if (objectType === "Object" && inputValue.constructor) {
    objectType = inputValue.constructor.name;
  }

  // Convert Map or Set to an array
  if (objectType === "Map" || objectType === "Set") {
    return Array.from(inputValue);
  }

  // Handle Arguments object or TypedArrays (e.g., Uint8Array, Int16Array, etc.)
  const isArgumentsOrTypedArray = (
    objectType === "Arguments" ||
    /^(?:createJsonScanner|createObjectTracker)nt(?:8|16|32)(?:Clamped)?Array$/.test(objectType)
  );
  if (isArgumentsOrTypedArray) {
    return normalizeStringOrArrayLike(inputValue, context);
  }
}

// Dependency: normalizeStringOrArrayLike (aliased from 'm') must be imported or defined elsewhere

module.exports = normalizeIterableOrString;