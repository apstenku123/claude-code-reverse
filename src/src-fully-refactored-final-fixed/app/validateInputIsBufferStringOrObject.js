/**
 * Validates that the input is either a Buffer, a string, or an object.
 * Throws an error if the input is of any other type.
 *
 * @param {any} inputValue - The value to validate.
 * @throws {Error} Throws an error if inputValue is not a Buffer, string, or object.
 * @returns {void} Returns nothing if the input is valid.
 */
function validateInputIsBufferStringOrObject(inputValue) {
  // Check if inputValue is a Buffer using Ed.isBuffer
  if (Ed.isBuffer(inputValue)) return;

  // Check if inputValue is a string
  if (typeof inputValue === "string") return;

  // Check if inputValue is an object (but not null)
  if (typeof inputValue === "object") return;

  // If inputValue is none of the above, throw an error using createFormattedTypeError and tA5
  throw createFormattedTypeError(tA5);
}

module.exports = validateInputIsBufferStringOrObject;