/**
 * Returns an error message indicating that the pattern length exceeds the allowed maximum.
 *
 * @param {number} maxPatternLength - The maximum allowed length for the pattern.
 * @returns {string} Error message specifying the maximum allowed pattern length.
 */
const getPatternLengthExceededMessage = (maxPatternLength) => {
  // Construct and return the error message with the provided maximum length
  return `Pattern length exceeds max of ${maxPatternLength}.`;
};

module.exports = getPatternLengthExceededMessage;
