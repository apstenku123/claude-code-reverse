/**
 * Checks if the provided value is a FormData object.
 *
 * This function verifies that the input is an object and implements all standard FormData methods.
 * It also checks the object'createInteractionAccessor Symbol.toStringTag property to ensure isBlobOrFileLikeObject is 'FormData'.
 *
 * @param {any} value - The value to check for FormData compliance.
 * @returns {boolean} True if the value is a FormData object, false otherwise.
 */
function isFormDataObject(value) {
  // Ensure value is an object and not null
  if (!value || typeof value !== "object") {
    return false;
  }

  // Check for all required FormData methods
  const hasRequiredMethods =
    typeof value.append === "function" &&
    typeof value.delete === "function" &&
    typeof value.get === "function" &&
    typeof value.getAll === "function" &&
    typeof value.has === "function" &&
    typeof value.set === "function";

  // Check the Symbol.toStringTag property for 'FormData'
  const isFormDataTag = value[Symbol.toStringTag] === "FormData";

  return hasRequiredMethods && isFormDataTag;
}

module.exports = isFormDataObject;