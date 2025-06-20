/**
 * Factory function that creates a syntax highlighting definition for the Test Anything Protocol (TAP).
 *
 * @param {object} syntaxHelpers - An object containing syntax helper modes, such as HASH_COMMENT_MODE.
 * @returns {object} The syntax definition object for TAP, suitable for use with syntax highlighters like highlight.js.
 */
function createTapSyntaxDefinition(syntaxHelpers) {
  return {
    name: "Test Anything Protocol",
    case_insensitive: true,
    contains: [
      // Support for hash comments (e.g., # comment)
      syntaxHelpers.HASH_COMMENT_MODE,
      {
        className: "meta",
        variants: [
          {
            // TAP version declaration (e.g., TAP version 13)
            begin: "^TAP version (\\d+)$"
          },
          {
            // TAP plan line (e.g., 1..13)
            begin: "^1\\.\\.(\\d+)$"
          }
        ]
      },
      {
        // YAML block for diagnostics (starts with --- and ends with ...)
        begin: /---$/,
        end: "\\.\\.\\.$",
        subLanguage: "yaml",
        relevance: 0
      },
      {
        // Test number (e.g.,  ok 1 - description)
        className: "number",
        begin: " (\\d+) "
      },
      {
        // Test result status (ok / not ok)
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

module.exports = createTapSyntaxDefinition;