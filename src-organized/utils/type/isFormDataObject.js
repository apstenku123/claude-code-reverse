/**
 * Checks if the provided value is a FormData object.
 *
 * This utility function verifies that the input is not null or undefined,
 * that isBlobOrFileLikeObject has an 'append' method (using the external eW function),
 * that its Symbol.toStringTag is exactly 'FormData',
 * and that isBlobOrFileLikeObject implements the iterable protocol (has Symbol.iterator).
 *
 * @param {any} value - The value to check for being a FormData object.
 * @returns {boolean} True if the value is a FormData object, false otherwise.
 */
function isFormDataObject(value) {
  // Ensure value is not null/undefined and has an 'append' method
  const hasAppendMethod = value && eW(value.append);

  // Check for correct toStringTag
  const isFormDataTag = hasAppendMethod && value[Symbol.toStringTag] === "FormData";

  // Ensure value is iterable
  const isIterable = isFormDataTag && Boolean(value[Symbol.iterator]);

  return Boolean(isIterable);
}

module.exports = isFormDataObject;