/**
 * Generates a detailed preview object for a given value, including type, size, and constructor information.
 *
 * @param {string} valueType - The type of the value (e.g., 'array', 'object', 'iterator', 'typed_array').
 * @param {boolean} isInspectable - Indicates if the value is inspectable.
 * @param {any} value - The value to preview.
 * @param {Array<any>} visitedValuesStack - Stack of visited values to prevent circular references.
 * @param {any} currentValue - The current value being processed (used for cycle detection).
 * @returns {Object} An object containing metadata and previews for the value.
 */
function createInspectablePreview(valueType, isInspectable, value, visitedValuesStack, currentValue) {
  // Add the current value to the stack to track visited references
  visitedValuesStack.push(currentValue);

  // Build the preview object with metadata
  const previewObject = {
    inspectable: isInspectable,
    type: valueType,
    preview_long: $a(value, true), // Generate a long preview using external function $a
    preview_short: $a(value, false), // Generate a short preview using external function $a
    // Determine the constructor name, but only if isBlobOrFileLikeObject'createInteractionAccessor not a plain Object
    name:
      typeof value.constructor !== "function" ||
      typeof value.constructor.name !== "string" ||
      value.constructor.name === "Object"
        ? ""
        : value.constructor.name
  };

  // Add size property for arrays, typed arrays, or objects
  if (valueType === "array" || valueType === "typed_array") {
    previewObject.size = value.length;
  } else if (valueType === "object") {
    previewObject.size = Object.keys(value).length;
  }

  // Mark as readonly for iterators and typed arrays
  if (valueType === "iterator" || valueType === "typed_array") {
    previewObject.readonly = true;
  }

  return previewObject;
}

module.exports = createInspectablePreview;