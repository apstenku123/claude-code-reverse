/**
 * Returns a syntax highlighting definition object for STEP Part 21 (ISO-10303-21) files.
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and helpers.
 * @returns {object} Highlight.js language definition for STEP Part 21 files.
 */
function getStepPart21HighlightDefinition(hljs) {
  return {
    name: "STEP Part 21",
    aliases: ["attachSentryHubToObject", "step", "stp"],
    case_insensitive: true,
    keywords: {
      // Matches STEP keywords (HEADER, ENDSEC, DATA)
      $pattern: "[a-zA-Z_][a-zA-Z0-9_.]*",
      keyword: "HEADER ENDSEC DATA"
    },
    contains: [
      // File header marker
      {
        className: "meta",
        begin: "ISO-10303-21;",
        relevance: 10
      },
      // File footer marker
      {
        className: "meta",
        begin: "END-ISO-10303-21;",
        relevance: 10
      },
      // Single-line comments (C-style)
      hljs.C_LINE_COMMENT_MODE,
      // Block comments (C-style)
      hljs.C_BLOCK_COMMENT_MODE,
      // Doxygen-style block comments
      hljs.COMMENT("/\*\\*!", "\\*/"),
      // Numbers (C-style)
      hljs.C_NUMBER_MODE,
      // Single-quoted strings (with illegal set to null to allow any content)
      hljs.inherit(hljs.APOS_STRING_MODE, {
        illegal: null
      }),
      // Double-quoted strings (with illegal set to null to allow any content)
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null
      }),
      // STEP entity string (single quotes)
      {
        className: "string",
        begin: "'",
        end: "'"
      },
      // STEP entity reference (e.g., #123)
      {
        className: "symbol",
        variants: [
          {
            begin: "#",
            end: "\\d+",
            illegal: "\\W"
          }
        ]
      }
    ]
  };
}

module.exports = getStepPart21HighlightDefinition;