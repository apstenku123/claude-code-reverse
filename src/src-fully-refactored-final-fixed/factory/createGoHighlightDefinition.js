/**
 * Factory function that creates a syntax highlighting definition for the Go programming language.
 * This is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing common language modes and regexes.
 * @returns {object} The Go language definition object for highlight.js.
 */
function createGoHighlightDefinition(hljs) {
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
    illegal: "</", // Disallow HTML-like syntax
    contains: [
      hljs.C_LINE_COMMENT_MODE, // Single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // Multi-line comments
      {
        className: "string",
        // Go supports double-quoted, single-quoted, and backtick (raw) strings
        variants: [
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            begin: "`",
            end: "`"
          }
        ]
      },
      {
        className: "number",
        // Go supports imaginary numbers (e.g., 1.23i)
        variants: [
          {
            begin: hljs.C_NUMBER_RE + "[i]", // Imaginary number
            relevance: 1
          },
          hljs.C_NUMBER_MODE // Standard number mode
        ]
      },
      {
        begin: /:=/ // Short variable declaration operator
      },
      {
        className: "function",
        beginKeywords: "func",
        end: "\\s*(\\{|$)", // Function ends at '{' or end of line
        excludeEnd: true, // normalizeToError not include the end pattern in the match
        contains: [
          hljs.TITLE_MODE, // Function name
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: goKeywords, // Highlight keywords within parameters
            illegal: /["']/ // Disallow strings in parameter list
          }
        ]
      }
    ]
  };
}

module.exports = createGoHighlightDefinition;