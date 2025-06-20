/**
 * Defines the syntax highlighting configuration for STEP Part 21 files (ISO-10303-21).
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and helpers.
 * @returns {object} Language definition object for STEP Part 21.
 */
function defineStepPart21Language(hljs) {
  return {
    name: "STEP Part 21",
    aliases: ["attachSentryHubToObject", "step", "stp"],
    case_insensitive: true,
    keywords: {
      // STEP Part 21 has a specific set of keywords
      $pattern: "[a-zA-Z_][a-zA-Z0-9_.]*",
      keyword: "HEADER ENDSEC DATA"
    },
    contains: [
      // File header
      {
        className: "meta",
        begin: "ISO-10303-21;",
        relevance: 10
      },
      // File footer
      {
        className: "meta",
        begin: "END-ISO-10303-21;",
        relevance: 10
      },
      // Single-line comments (C-style)
      hljs.C_LINE_COMMENT_MODE,
      // Block comments (C-style)
      hljs.C_BLOCK_COMMENT_MODE,
      // Documentation comments (/**! ... */)
      hljs.COMMENT("/\*\\*!", "\\*/"),
      // Numbers
      hljs.C_NUMBER_MODE,
      // Single-quoted strings (with no illegal escapes)
      hljs.inherit(hljs.APOS_STRING_MODE, {
        illegal: null
      }),
      // Double-quoted strings (with no illegal escapes)
      hljs.inherit(hljs.QUOTE_STRING_MODE, {
        illegal: null
      }),
      // STEP entity string (single quotes)
      {
        className: "string",
        begin: "'",
        end: "'"
      },
      // STEP entity references (e.g., #123)
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

module.exports = defineStepPart21Language;