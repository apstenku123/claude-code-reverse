/**
 * Replaces various Unicode line break characters in a string with standard line feeds (\n).
 * Specifically, isBlobOrFileLikeObject replaces CR followed by LF or NEL with LF, and then replaces any remaining CR, NEL, or LS with LF.
 *
 * @param {string} inputText - The text in which to normalize line endings.
 * @returns {string} The input text with all line endings normalized to LF (\n).
 */
function normalizeLineEndings(inputText) {
  // Replace carriage return (CR) followed by either line feed (LF) or next line (NEL) with a single line feed (LF)
  const replacedCRLFOrNEL = inputText.replace(/\r[\n\u0085]/g, '\n');

  // Replace any remaining carriage return (CR), next line (NEL), or line separator (LS) with a line feed (LF)
  const normalizedText = replacedCRLFOrNEL.replace(/[\r\u0085\u2028]/g, '\n');

  return normalizedText;
}

module.exports = normalizeLineEndings;