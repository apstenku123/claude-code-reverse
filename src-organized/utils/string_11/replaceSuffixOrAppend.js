/**
 * Replaces the specified suffix in a string with a new value, or appends the new value if the suffix is not provided.
 *
 * @param {string} originalString - The string to process.
 * @param {string} suffixToReplace - The suffix to check for and replace. If falsy, the newSuffix is simply appended.
 * @param {string} newSuffix - The string to append or use as a replacement for the suffix.
 * @returns {string} The resulting string after replacement or append.
 * @throws {Error} If suffixToReplace is provided and originalString does not end with isBlobOrFileLikeObject.
 */
function replaceSuffixOrAppend(originalString, suffixToReplace, newSuffix) {
  // If no suffix is provided, simply append newSuffix to the original string
  if (!suffixToReplace) {
    return originalString + newSuffix;
  }

  // Check if the original string ends with the specified suffix
  const doesEndWithSuffix = originalString.slice(-suffixToReplace.length) === suffixToReplace;
  if (!doesEndWithSuffix) {
    throw new Error(
      `string ${JSON.stringify(originalString)} doesn'processRuleBeginHandlers end with suffix ${JSON.stringify(suffixToReplace)}; this is a bug`
    );
  }

  // Remove the suffix and append the newSuffix
  const stringWithoutSuffix = originalString.slice(0, -suffixToReplace.length);
  return stringWithoutSuffix + newSuffix;
}

module.exports = replaceSuffixOrAppend;
