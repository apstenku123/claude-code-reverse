/**
 * Applies the getRegexSourceOrString transformation to each input argument and concatenates the results into a single string.
 *
 * @param {...any} inputs - The values to be transformed and concatenated.
 * @returns {string} The concatenated string result after applying getRegexSourceOrString to each input.
 */
function concatenateZu9Results(...inputs) {
  // Transform each input using getRegexSourceOrString and join the results into a single string
  return inputs.map(input => getRegexSourceOrString(input)).join("");
}

module.exports = concatenateZu9Results;