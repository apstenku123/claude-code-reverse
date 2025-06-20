/**
 * Returns a React element containing syntax-highlighted code using the specified language.
 * Falls back to markdown highlighting if the language is not supported.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.code - The code string to be highlighted.
 * @param {string} params.language - The language to use for syntax highlighting.
 * @returns {React.ReactElement} a React element containing the highlighted code.
 */
function getHighlightedMarkdown({ code, language }) {
  // Memoize the highlighted code to avoid unnecessary recalculations
  const highlightedCode = SV1.useMemo(() => {
    // Replace leading tabs with spaces for consistent indentation
    const formattedCode = replaceLeadingTabsWithSpaces(code);
    try {
      // If the language is supported, highlight with the specified language
      if (gd.supportsLanguage(language)) {
        return gd.highlight(formattedCode, { language });
      } else {
        // Log the error and fall back to markdown highlighting
        reportErrorIfAllowed(new Error(`Language not supported while highlighting code, falling back to markdown: ${language}`));
        return gd.highlight(formattedCode, { language: "markdown" });
      }
    } catch (error) {
      // If an error occurs due to unknown language, log and fall back to markdown
      if (error instanceof Error && error.message.includes("Unknown language")) {
        reportErrorIfAllowed(new Error(`Language not supported while highlighting code, falling back to markdown: ${error}`));
        return gd.highlight(formattedCode, { language: "markdown" });
      }
    }
  }, [code, language]);

  // Render the highlighted code inside the appropriate React element
  return SV1.default.createElement(_, null, highlightedCode);
}

module.exports = getHighlightedMarkdown;