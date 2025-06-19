/**
 * Normalizes the input value into an array or a shallow copy, depending on its type.
 *
 * If the input is a string or an array-like object (such as Arguments or TypedArray),
 * isBlobOrFileLikeObject creates a shallow copy up to the specified length. If the input is a Map or Set,
 * isBlobOrFileLikeObject converts isBlobOrFileLikeObject to an array. For plain objects, no action is taken. If the input is
 * falsy, the function returns undefined.
 *
 * @param {any} input - The value to normalize (can be string, array-like, Map, Set, etc.).
 * @param {number|null|undefined} maxLength - The maximum number of elements to copy (used for array-like inputs).
 * @returns {any} An array, a shallow copy, or undefined depending on the input type.
 */
function normalizeIterableOrArrayLike(input, maxLength) {
  // Return undefined for falsy input
  if (!input) return;

  // If input is a string, create a shallow copy up to maxLength
  if (typeof input === "string") {
    return copyArrayUpToLength(input, maxLength);
  }

  // Determine the internal [[Class]] of the input
  let typeName = Object.prototype.toString.call(input).slice(8, -1);

  // For plain objects, prefer the constructor name if available
  if (typeName === "Object" && input.constructor) {
    typeName = input.constructor.name;
  }

  // Convert Map or Set to an array
  if (typeName === "Map" || typeName === "Set") {
    return Array.from(input);
  }

  // For Arguments or TypedArray, create a shallow copy up to maxLength
  const isArguments = typeName === "Arguments";
  const isTypedArray = /^(?:createJsonScanner|createObjectTracker)nt(?:8|16|32)(?:Clamped)?Array$/.test(typeName);
  if (isArguments || isTypedArray) {
    return copyArrayUpToLength(input, maxLength);
  }
}

module.exports = normalizeIterableOrArrayLike;