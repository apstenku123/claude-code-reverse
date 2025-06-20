/**
 * Defines syntax highlighting rules for the Smalltalk programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and regexes.
 * @returns {object} Language definition object for Smalltalk highlighting.
 */
function defineSmalltalkHighlighting(hljs) {
  // String interpolation: $ followed by any character
  const stringInterpolation = {
    className: "string",
    begin: "\\$.{1}"
  };

  // Symbol: # followed by a valid identifier
  const symbol = {
    className: "symbol",
    begin: "#" + hljs.UNDERSCORE_IDENT_RE
  };

  return {
    name: "Smalltalk",
    aliases: ["st"],
    keywords: "self super nil true false thisContext",
    contains: [
      // Double-quoted comments
      hljs.COMMENT('"', '"'),
      // Single-quoted string mode
      hljs.APOS_STRING_MODE,
      // Type/class names: Capitalized identifier
      {
        className: "type",
        begin: "\\b[a-zA][a-z0-9_]*",
        relevance: 0
      },
      // Method selectors: identifier ending with a colon
      {
        begin: "[a-z][a-zA-Z0-9_]*:",
        relevance: 0
      },
      // Numeric literals
      hljs.C_NUMBER_MODE,
      // Symbol
      symbol,
      // String interpolation
      stringInterpolation,
      // Temporary variable declarations: | var1 var2 |
      {
        begin: "\\|[ ]*[a-z][a-zA-Z0-9_]*([ ]+[a-z][a-zA-Z0-9_]*)*[ ]*\\|",
        returnBegin: true,
        end: /\|/,
        illegal: /\s/,
        contains: [
          {
            begin: "(\\|[ ]*)?[a-z][a-zA-Z0-9_]*"
          }
        ]
      },
      // Array literals: #( ... )
      {
        begin: "#\\(",
        end: "\\)",
        contains: [
          hljs.APOS_STRING_MODE,
          stringInterpolation,
          hljs.C_NUMBER_MODE,
          symbol
        ]
      }
    ]
  };
}

module.exports = defineSmalltalkHighlighting;