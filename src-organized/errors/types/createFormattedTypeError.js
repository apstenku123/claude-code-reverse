/**
 * Creates a TypeError with a formatted message using mF2.format.
 * The first argument is the format string, and the rest are values to interpolate.
 *
 * @param {string} formatString - The format string to use for the error message.
 * @param {...any} formatArgs - Arguments to interpolate into the format string.
 * @returns {TypeError} a TypeError with the formatted message.
 */
function createFormattedTypeError(formatString, ...formatArgs) {
  // Bind the formatString as the first argument to mF2.format, then apply the rest of the arguments
  const formattedMessage = mF2.format.bind(mF2, formatString).apply(null, formatArgs);
  // Return a new TypeError with the formatted message
  return new TypeError(formattedMessage);
}

module.exports = createFormattedTypeError;