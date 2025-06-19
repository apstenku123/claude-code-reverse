/**
 * Replaces star characters in the input string using a provided configuration, then trims and removes all star characters from the result.
 *
 * @param {string} inputString - The string to process.
 * @param {object} replaceConfig - Configuration object for the star replacement logic.
 * @returns {string} The processed string with stars replaced and removed, and trimmed of whitespace.
 */
function replaceStarsAndTrim(inputString, replaceConfig) {
  // Call external function to perform star replacement (side effect)
  wB("replaceStars", inputString, replaceConfig);

  // Remove all star characters (as defined by AW[jD.STAR]) after trimming whitespace
  return inputString.trim().replace(AW[jD.STAR], "");
}

module.exports = replaceStarsAndTrim;