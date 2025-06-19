/**
 * Determines if the provided value is a FormData instance.
 *
 * This utility checks if the given object is a FormData by verifying:
 *   - It is truthy
 *   - It has an 'append' method (using the eW utility)
 *   - Its Symbol.toStringTag is 'FormData'
 *   - It implements the iterable protocol (has Symbol.iterator)
 *
 * @param {any} value - The value to check for FormData characteristics.
 * @returns {boolean} True if the value is a FormData instance, false otherwise.
 */
function isFormDataInstance(value) {
  // Ensure the value is not null or undefined
  if (!value) {
    return false;
  }

  // Check if 'append' is a valid method using the eW utility
  const hasAppendMethod = eW(value.append);

  // Check if the Symbol.toStringTag property is 'FormData'
  const isFormDataTag = value[Symbol.toStringTag] === "FormData";

  // Check if the object is iterable (has Symbol.iterator)
  const isIterable = Boolean(value[Symbol.iterator]);

  // Return true only if all conditions are met
  return !!(hasAppendMethod && isFormDataTag && isIterable);
}

module.exports = isFormDataInstance;