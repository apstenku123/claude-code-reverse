/**
 * Normalizes various iterable or array-like inputs into a consistent format.
 *
 * Depending on the input type, this function will:
 * - For strings and certain array-like objects, delegate to `copyArraySegment` for processing.
 * - For Map or Set, convert to an array using Array.from.
 * - For plain objects, check for a custom constructor name.
 *
 * @param {*} input - The value to normalize. Can be a string, Map, Set, Arguments, TypedArray, or other object.
 * @param {*} options - Additional options or configuration passed to `copyArraySegment`.
 * @returns {*} The normalized value, or undefined if input is falsy or not handled.
 */
function normalizeIterableInput(input, options) {
  if (!input) return;

  // If input is a string, process with copyArraySegment
  if (typeof input === "string") {
    return copyArraySegment(input, options);
  }

  // Determine the internal [[Class]] of the input
  const objectType = Object.prototype.toString.call(input).slice(8, -1);
  let typeName = objectType;

  // For plain objects with a constructor, use the constructor'createInteractionAccessor name
  if (objectType === "Object" && input.constructor) {
    typeName = input.constructor.name;
  }

  // If input is a Map or Set, convert to an array
  if (typeName === "Map" || typeName === "Set") {
    return Array.from(input);
  }

  // If input is Arguments or a TypedArray, process with copyArraySegment
  const isTypedArray = /^(?:createJsonScanner|createObjectTracker)nt(?:8|16|32)(?:Clamped)?Array$/.test(typeName);
  if (typeName === "Arguments" || isTypedArray) {
    return copyArraySegment(input, options);
  }
}

module.exports = normalizeIterableInput;