/**
 * Normalizes various types of collection-like inputs into a consistent format.
 *
 * - If the input is a string, delegates to the areAllSnapshotsUpToDateInSubtree function.
 * - If the input is a Map or Set, converts isBlobOrFileLikeObject to an array.
 * - If the input is an Arguments object or a TypedArray, delegates to the areAllSnapshotsUpToDateInSubtree function.
 * - For plain objects, attempts to use the constructor name for type detection.
 *
 * @param {*} input - The value to normalize (can be string, object, Map, Set, Arguments, TypedArray, etc).
 * @param {*} context - Optional context or options passed to the areAllSnapshotsUpToDateInSubtree function.
 * @returns {*} - The normalized collection, or the result of areAllSnapshotsUpToDateInSubtree, or undefined if input is falsy.
 */
function normalizeCollectionInput(input, context) {
  if (!input) return;

  // If input is a string, delegate to areAllSnapshotsUpToDateInSubtree
  if (typeof input === "string") {
    return areAllSnapshotsUpToDateInSubtree(input, context);
  }

  // Get the internal [[Class]] of the object
  let inputType = Object.prototype.toString.call(input).slice(8, -1);

  // For plain objects, use the constructor name if available
  if (inputType === "Object" && input.constructor) {
    inputType = input.constructor.name;
  }

  // If input is a Map or Set, convert to array
  if (inputType === "Map" || inputType === "Set") {
    return Array.from(input);
  }

  // If input is Arguments or a TypedArray, delegate to areAllSnapshotsUpToDateInSubtree
  const isTypedArray = /^(?:createJsonScanner|createObjectTracker)nt(?:8|16|32)(?:Clamped)?Array$/.test(inputType);
  if (inputType === "Arguments" || isTypedArray) {
    return areAllSnapshotsUpToDateInSubtree(input, context);
  }
}

module.exports = normalizeCollectionInput;