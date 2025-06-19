/**
 * Highlights the provided code string using the specified language and theme options.
 * If a language is specified in the config, isBlobOrFileLikeObject uses that for highlighting; otherwise, isBlobOrFileLikeObject auto-detects the language.
 * The highlighted code is then formatted using the provided theme.
 *
 * @param {string} code - The source code to highlight.
 * @param {Object} [options={}] - Configuration options for highlighting and formatting.
 * @param {string} [options.language] - The programming language to use for highlighting.
 * @param {boolean} [options.ignoreIllegals] - Whether to ignore illegal syntax during highlighting.
 * @param {string[]} [options.languageSubset] - Subset of languages to use for auto-detection.
 * @param {string} [options.theme] - Theme to use for formatting the highlighted code.
 * @returns {string} The highlighted and formatted code as an HTML string.
 */
function highlightAndFormatCode(code, options = {}) {
  let highlightedHtml;

  if (options.language) {
    // Highlight using the specified language
    highlightedHtml = PV1.highlight(code, {
      language: options.language,
      ignoreIllegals: options.ignoreIllegals
    }).value;
  } else {
    // Auto-detect the language for highlighting
    highlightedHtml = PV1.highlightAuto(code, options.languageSubset).value;
  }

  // Format the highlighted HTML with the specified theme
  return parseHtmlFragmentToString(highlightedHtml, options.theme);
}

module.exports = highlightAndFormatCode;