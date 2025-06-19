/**
 * Trims characters from the start and/or end of a string based on a provided predicate function that evaluates each character'createInteractionAccessor char code.
 *
 * @param {string} inputString - The string to be trimmed.
 * @param {boolean} [trimStart=true] - Whether to trim characters from the start of the string.
 * @param {boolean} [trimEnd=true] - Whether to trim characters from the end of the string.
 * @returns {string} The trimmed string.
 */
function trimStringByCharCodePredicate(inputString, trimStart = true, trimEnd = true) {
  // isWhitespaceCharacterCode is assumed to be a predicate function that takes a char code and returns true if the character should be trimmed
  // trimStringByPredicate is assumed to be a function that trims the string using the predicate
  return trimStringByPredicate(inputString, trimStart, trimEnd, isWhitespaceCharacterCode);
}

module.exports = trimStringByCharCodePredicate;