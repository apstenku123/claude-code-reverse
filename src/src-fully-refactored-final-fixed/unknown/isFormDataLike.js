/**
 * Checks if the provided value is a FormData-like object.
 *
 * This function verifies that the input is an object and implements all standard
 * FormData methods (append, delete, get, getAll, has, set), and has the correct
 * Symbol.toStringTag property.
 *
 * @param {any} value - The value to check for FormData-like structure.
 * @returns {boolean} True if the value is FormData-like, false otherwise.
 */
function isFormDataLike(value) {
  // Ensure the value is an object and not null
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
  const hasFormDataTag = value[Symbol.toStringTag] === "FormData";

  return hasRequiredMethods && hasFormDataTag;
}

module.exports = isFormDataLike;