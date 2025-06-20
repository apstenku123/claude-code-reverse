/**
 * Applies the getSourceString transformation to each input argument and concatenates the results into a single string.
 *
 * @param {...any} inputs - The values to be transformed and concatenated.
 * @returns {string} The concatenated string result after applying getSourceString to each input.
 */
function concatenateCc9Results(...inputs) {
  // Apply getSourceString to each input and join the results into a single string
  return inputs.map(input => getSourceString(input)).join("");
}

module.exports = concatenateCc9Results;