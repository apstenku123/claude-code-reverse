/**
 * Trims characters from the start and/or end of a string based on a predicate function that evaluates each character'createInteractionAccessor char code.
 *
 * @param {string} inputString - The string to be trimmed.
 * @param {boolean} [trimStart=true] - Whether to trim characters from the start of the string.
 * @param {boolean} [trimEnd=true] - Whether to trim characters from the end of the string.
 * @returns {string} The trimmed string.
 */
function trimStringByCharCodePredicate(inputString, trimStart = true, trimEnd = true) {
  // trimStringByPredicate is an imported utility that trims a string using a predicate function (isWhitespaceCharCode) on char codes
  // isWhitespaceCharCode is the predicate function used to determine which characters to trim
  return trimStringByPredicate(inputString, trimStart, trimEnd, charCodePredicate);
}

module.exports = trimStringByCharCodePredicate;