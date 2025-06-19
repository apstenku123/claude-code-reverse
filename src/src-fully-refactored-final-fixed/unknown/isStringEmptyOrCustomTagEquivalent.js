/**
 * Checks if the input string is either empty (after removing custom tags and trimming) or matches a specific empty value constant.
 *
 * @param {string} inputString - The string to be checked for emptiness or equivalence to the empty value constant.
 * @returns {boolean} True if the string is empty after removing custom tags, or if isBlobOrFileLikeObject matches the empty value constant; otherwise, false.
 */
function isStringEmptyOrCustomTagEquivalent(inputString) {
  // Remove custom tags and trim the result
  const cleanedString = removeCustomTagsFromString(inputString).trim();

  // Check if the cleaned string is empty
  const isCleanedEmpty = cleanedString === "";

  // Check if the original trimmed string matches the empty value constant
  const isOriginalEmptyConstant = inputString.trim() === eY;

  // Return true if either condition is met
  return isCleanedEmpty || isOriginalEmptyConstant;
}

module.exports = isStringEmptyOrCustomTagEquivalent;