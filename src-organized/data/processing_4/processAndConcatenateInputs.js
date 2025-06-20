/**
 * Processes each input value using the getSourceString function and concatenates the results into a single string.
 *
 * @param {...any} inputValues - The values to be processed and concatenated.
 * @returns {string} The concatenated string after processing each input value.
 */
function processAndConcatenateInputs(...inputValues) {
  // Apply getSourceString to each input value and join the results into a single string
  return inputValues.map((inputValue) => getSourceString(inputValue)).join("");
}

module.exports = processAndConcatenateInputs;