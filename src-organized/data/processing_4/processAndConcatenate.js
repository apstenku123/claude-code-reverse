/**
 * Processes each input value using the getSourceString function and concatenates the results into a single string.
 *
 * @param {...any} values - The values to be processed and concatenated.
 * @returns {string} The concatenated string after processing each input value.
 */
function processAndConcatenate(...values) {
  // Apply getSourceString to each value and join the results into a single string
  return values.map(value => getSourceString(value)).join("");
}

module.exports = processAndConcatenate;