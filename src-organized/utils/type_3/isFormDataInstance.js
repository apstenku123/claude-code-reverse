/**
 * Checks if the provided value is a FormData instance.
 *
 * This function verifies that the input is an object and implements all standard
 * FormData methods, as well as having the correct Symbol.toStringTag property.
 *
 * @param {any} value - The value to check for FormData compliance.
 * @returns {boolean} True if the value is a FormData instance, false otherwise.
 */
function isFormDataInstance(value) {
  // Ensure the value is an object
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

  // Check for the correct Symbol.toStringTag
  const isCorrectTag = value[Symbol.toStringTag] === "FormData";

  return hasRequiredMethods && isCorrectTag;
}

module.exports = isFormDataInstance;