/**
 * Checks if the processed input or the raw input is empty or matches a specific constant.
 *
 * @param {string} inputValue - The input string to be checked.
 * @returns {boolean} True if the processed input is empty or the raw input matches the constant; otherwise, false.
 */
function isInputEmptyOrEqualsConstant(inputValue) {
  // Process the input using the 'pe' function and trim whitespace
  const processedInput = pe(inputValue).trim();
  // Trim whitespace from the raw input
  const trimmedInput = inputValue.trim();
  // Check if the processed input is empty or the trimmed input matches the constant 'eY'
  return processedInput === "" || trimmedInput === eY;
}

module.exports = isInputEmptyOrEqualsConstant;