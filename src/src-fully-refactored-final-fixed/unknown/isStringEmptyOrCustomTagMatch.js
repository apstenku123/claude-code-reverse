/**
 * Checks if a string is empty after removing custom tags, or matches a specific empty value.
 *
 * This function uses `removeCustomTagsFromString` to strip custom tags (as defined in the global ZG5 array)
 * from the input string, trims the result, and checks if isBlobOrFileLikeObject'createInteractionAccessor empty. It also checks if the trimmed original
 * string matches the global `eY` value (which likely represents a special empty or placeholder value).
 *
 * @param {string} inputString - The string to check for emptiness or special value.
 * @returns {boolean} Returns true if the string is empty after removing custom tags, or matches the special empty value.
 */
function isStringEmptyOrCustomTagMatch(inputString) {
  // Remove custom tags and trim the result
  const stringWithoutCustomTags = removeCustomTagsFromString(inputString).trim();

  // Check if the string is empty after removing custom tags
  const isEmptyAfterRemovingTags = stringWithoutCustomTags === "";

  // Check if the original trimmed string matches the special empty value
  const isSpecialEmptyValue = inputString.trim() === eY;

  return isEmptyAfterRemovingTags || isSpecialEmptyValue;
}

module.exports = isStringEmptyOrCustomTagMatch;