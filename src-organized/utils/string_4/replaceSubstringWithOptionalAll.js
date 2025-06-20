/**
 * Replaces occurrences of a target substring within a source string with a replacement string.
 * Optionally replaces all occurrences or just the first, and handles special cases for substrings ending with a newline.
 *
 * @param {string} sourceString - The string in which to perform the replacement.
 * @param {string} targetSubstring - The substring to search for and replace.
 * @param {string} replacementString - The string to replace the target substring with.
 * @param {boolean} [replaceAllOccurrences=false] - If true, replaces all occurrences; otherwise, only the first occurrence is replaced.
 * @returns {string} The resulting string after performing the replacement(createInteractionAccessor).
 */
function replaceSubstringWithOptionalAll(
  sourceString,
  targetSubstring,
  replacementString,
  replaceAllOccurrences = false
) {
  // Choose the appropriate replacement function based on replaceAllOccurrences
  const replaceFn = replaceAllOccurrences
    ? (input, search, replacement) => input.replaceAll(search, () => replacement)
    : (input, search, replacement) => input.replace(search, () => replacement);

  // If a non-empty replacement string is provided, perform the replacement directly
  if (replacementString !== "") {
    return replaceFn(sourceString, targetSubstring, replacementString);
  }

  // If the target substring does not end with a newline, and the source contains the target plus a newline,
  // perform the replacement on the target plus newline instead
  if (
    !targetSubstring.endsWith("\n") &&
    sourceString.includes(targetSubstring + "\n")
  ) {
    return replaceFn(
      sourceString,
      targetSubstring + "\n",
      replacementString
    );
  }

  // Default case: perform the replacement on the original target substring
  return replaceFn(sourceString, targetSubstring, replacementString);
}

module.exports = replaceSubstringWithOptionalAll;
