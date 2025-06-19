/**
 * Validates that the input is either a Buffer, a string, or an object.
 * Throws an error if the input is of any other type.
 *
 * @param {*} inputValue - The value to validate.
 * @throws {Error} Throws an error if inputValue is not a Buffer, string, or object.
 * @returns {void} Returns nothing if input is valid.
 */
function validateInputType(inputValue) {
  // Check if inputValue is a Buffer using Ed.isBuffer
  if (Ed.isBuffer(inputValue)) return;

  // Check if inputValue is a string
  if (typeof inputValue === "string") return;

  // Check if inputValue is an object (including arrays, but not null)
  if (typeof inputValue === "object") return;

  // If none of the above, throw an error using createFormattedTypeError and tA5
  throw createFormattedTypeError(tA5);
}

module.exports = validateInputType;