/**
 * Factory function that returns a syntax highlighting definition object for the Go programming language.
 *
 * @param {object} hljs - The syntax highlighting library instance, expected to provide standard modes and regexes.
 * @returns {object} Syntax highlighting definition for Go, suitable for use with highlight.js or similar libraries.
 */
function createGoLanguageDefinition(hljs) {
  // Define Go language keywords, literals, and built-in functions
  const goKeywords = {
    keyword:
      "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
    literal: "true false iota nil",
    built_in:
      "append cap close complex copy imag len make new panic print println real recover delete"
  };

  return {
    name: "Go",
    aliases: ["golang"],
    keywords: goKeywords,
    // Illegal pattern to avoid matching HTML tags
    illegal: "</",
    contains: [
      // Single-line comments (// ...)
      hljs.C_LINE_COMMENT_MODE,
      // Multi-line comments (/* ... */)
      hljs.C_BLOCK_COMMENT_MODE,
      // String literals: double-quoted, single-quoted, and backtick-quoted
      {
        className: "string",
        variants: [
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          {
            begin: "`",
            end: "`"
          }
        ]
      },
      // Number literals, including imaginary numbers (ending with 'i')
      {
        className: "number",
        variants: [
          {
            begin: hljs.C_NUMBER_RE + "[i]",
            relevance: 1
          },
          hljs.C_NUMBER_MODE
        ]
      },
      // Short variable declaration operator (:=)
      {
        begin: /:=/
      },
      // Function definitions
      {
        className: "function",
        beginKeywords: "func",
        end: "\\s*(\\{|$)",
        excludeEnd: true,
        contains: [
          // Function name
          hljs.TITLE_MODE,
          // Function parameters
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: goKeywords,
            // Disallow string delimiters inside parameter list
            illegal: /["']/
          }
        ]
      }
    ]
  };
}

module.exports = createGoLanguageDefinition;