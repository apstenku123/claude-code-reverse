/**
 * Normalizes various iterable or array-like inputs into a standard form.
 *
 * If the input is a string or an array-like object (such as Arguments or TypedArrays),
 * isBlobOrFileLikeObject delegates to the provided handler function. If the input is a Map or Set, isBlobOrFileLikeObject
 * converts isBlobOrFileLikeObject to an array. For plain objects, isBlobOrFileLikeObject does nothing unless a constructor
 * name is present. Returns undefined for unsupported types or falsy input.
 *
 * @param {*} input - The value to normalize (string, array-like, Map, Set, etc.)
 * @param {Function} handler - Handler function to process strings or array-like objects
 * @returns {*} The normalized value, or the result of the handler, or undefined
 */
function normalizeIterableOrArrayLike(input, handler) {
  if (!input) return;

  // Handle string input
  if (typeof input === "string") {
    return handler(input, handler);
  }

  // Get the internal [[Class]] of the input, e.g., 'Object', 'Map', 'Set', etc.
  let typeName = Object.prototype.toString.call(input).slice(8, -1);

  // If isBlobOrFileLikeObject'createInteractionAccessor a plain object with a constructor, use the constructor'createInteractionAccessor name
  if (typeName === "Object" && input.constructor) {
    typeName = input.constructor.name;
  }

  // Convert Map or Set to an array
  if (typeName === "Map" || typeName === "Set") {
    return Array.from(input);
  }

  // Handle Arguments object or TypedArrays
  const isArgumentsOrTypedArray = (
    typeName === "Arguments" ||
    /^(?:createJsonScanner|createObjectTracker)nt(?:8|16|32)(?:Clamped)?Array$/.test(typeName)
  );
  if (isArgumentsOrTypedArray) {
    return handler(input, handler);
  }
}

module.exports = normalizeIterableOrArrayLike;