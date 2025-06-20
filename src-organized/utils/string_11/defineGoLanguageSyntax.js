/**
 * Defines the syntax highlighting configuration for the Go programming language.
 *
 * @param {object} hljs - The highlight.js core library object, providing common language modes and regexes.
 * @returns {object} The language definition object for Go, suitable for use with highlight.js.
 */
function defineGoLanguageSyntax(hljs) {
  // Define Go language keywords, literals, and built-in functions
  const goKeywords = {
    keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
    literal: "true false iota nil",
    built_in: "append cap close complex copy imag len make new panic print println real recover delete"
  };

  return {
    name: "Go",
    aliases: ["golang"],
    keywords: goKeywords,
    illegal: "</", // Disallow HTML-style tags to avoid false positives
    contains: [
      hljs.C_LINE_COMMENT_MODE, // Single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // Multi-line comments
      {
        className: "string",
        variants: [
          hljs.QUOTE_STRING_MODE, // Double-quoted strings
          hljs.APOS_STRING_MODE,  // Single-quoted strings
          {
            begin: "`",
            end: "`" // Raw string literals
          }
        ]
      },
      {
        className: "number",
        variants: [
          {
            begin: hljs.C_NUMBER_RE + "[i]", // Complex numbers (e.g., 1.23i)
            relevance: 1
          },
          hljs.C_NUMBER_MODE // Standard numbers
        ]
      },
      {
        begin: /:=/ // Short variable declaration operator
      },
      {
        className: "function",
        beginKeywords: "func",
        end: "\\s*(\\{|$)", // Function signature ends at '{' or end of line
        excludeEnd: true, // Exclude the end pattern from the match
        contains: [
          hljs.TITLE_MODE, // Function name
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: goKeywords, // Allow keywords in parameter lists
            illegal: /["']/ // Disallow strings in parameter lists
          }
        ]
      }
    ]
  };
}

module.exports = defineGoLanguageSyntax;