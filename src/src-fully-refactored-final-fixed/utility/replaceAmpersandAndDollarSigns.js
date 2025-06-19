/**
 * Replaces all ampersand ('&') and dollar sign ('$') characters in the input string
 * with their corresponding replacement values.
 *
 * @param {string} inputString - The string in which to replace characters.
 * @returns {string} - The modified string with replacements applied.
 */
function replaceAmpersandAndDollarSigns(inputString) {
  // Qw2 and Iw2 are assumed to be defined elsewhere in the codebase
  // Qw2: Replacement value for '&'
  // Iw2: Replacement value for '$'
  return inputString
    .replaceAll('&', Qw2) // Replace all ampersands
    .replaceAll('$', Iw2); // Replace all dollar signs
}

module.exports = replaceAmpersandAndDollarSigns;