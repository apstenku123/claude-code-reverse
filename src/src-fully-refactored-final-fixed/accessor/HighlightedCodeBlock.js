/**
 * Renders a syntax-highlighted code block using the specified language.
 * If the language is not supported, falls back to markdown highlighting and logs an error.
 *
 * @param {Object} props - The component props.
 * @param {string} props.code - The code string to be highlighted.
 * @param {string} props.language - The language to use for syntax highlighting.
 * @returns {React.Element} The rendered code block element with syntax highlighting.
 */
function HighlightedCodeBlock({ code, language }) {
  // Memoize the highlighted code to avoid unnecessary recalculations
  const highlightedCode = SV1.useMemo(() => {
    // Replace leading tabs with spaces for consistent indentation
    const codeWithSpaces = replaceLeadingTabsWithSpaces(code);
    try {
      // Check if the requested language is supported
      if (gd.supportsLanguage(language)) {
        // Highlight the code using the specified language
        return gd.highlight(codeWithSpaces, { language });
      } else {
        // Log an error and fall back to markdown highlighting
        reportErrorIfAllowed(new Error(`Language not supported while highlighting code, falling back to markdown: ${language}`));
        return gd.highlight(codeWithSpaces, { language: "markdown" });
      }
    } catch (error) {
      // Handle errors related to unknown languages
      if (error instanceof Error && error.message.includes("Unknown language")) {
        reportErrorIfAllowed(new Error(`Language not supported while highlighting code, falling back to markdown: ${error}`));
        return gd.highlight(codeWithSpaces, { language: "markdown" });
      }
    }
  }, [code, language]);

  // Render the highlighted code inside the appropriate component
  return SV1.default.createElement(_, null, highlightedCode);
}

module.exports = HighlightedCodeBlock;