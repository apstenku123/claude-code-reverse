/**
 * Factory function that creates a highlight.js language definition for the Test Anything Protocol (TAP).
 *
 * @param {Object} highlightJsHelpers - An object containing highlight.js helper modes and utilities.
 * @param {Object} highlightJsHelpers.HASH_COMMENT_MODE - Highlight.js mode for hash comments.
 * @returns {Object} Highlight.js language definition for TAP.
 */
function createTapHighlightDefinition(highlightJsHelpers) {
  return {
    name: "Test Anything Protocol",
    case_insensitive: true, // TAP is case-insensitive
    contains: [
      // Support for hash comments
      highlightJsHelpers.HASH_COMMENT_MODE,
      {
        className: "meta",
        variants: [
          {
            // TAP version line, e.g., 'TAP version 13'
            begin: "^TAP version (\\d+)$"
          },
          {
            // TAP plan line, e.g., '1..13'
            begin: "^1\\.\\.(\\d+)$"
          }
        ]
      },
      {
        // YAML block for diagnostics
        begin: /---$/,
        end: "\\.\\.\\.$",
        subLanguage: "yaml",
        relevance: 0
      },
      {
        // Test number, e.g., ' 1 '
        className: "number",
        begin: " (\\d+) "
      },
      {
        // Test result status: 'ok' or 'not ok'
        className: "symbol",
        variants: [
          {
            begin: "^ok"
          },
          {
            begin: "^not ok"
          }
        ]
      }
    ]
  };
}

module.exports = createTapHighlightDefinition;