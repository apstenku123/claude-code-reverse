/**
 * Checks if the provided string starts with a closing HTML/XML tag ('</').
 *
 * @param {string} inputString - The string to check for a closing tag at the start.
 * @returns {boolean} True if the string starts with '</', otherwise false.
 */
function startsWithClosingTag(inputString) {
  // Extract the first two characters and compare with '</'
  return inputString.slice(0, 2) === "</";
}

module.exports = startsWithClosingTag;