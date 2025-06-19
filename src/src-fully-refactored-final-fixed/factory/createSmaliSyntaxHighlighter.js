/**
 * Factory function to create a Smali syntax highlighter definition for use with highlight.js or similar libraries.
 *
 * @param {object} hljs - The syntax highlighting library instance, expected to provide a COMMENT method.
 * @returns {object} Smali language definition object for syntax highlighting.
 */
function createSmaliSyntaxHighlighter(hljs) {
  // List of Smali built-in operation keywords
  const smaliBuiltInKeywords = [
    "add", "and", "cmp", "cmpg", "cmpl", "const", "div", "double", "float", "goto", "if", "int", "long", "move", "mul", "neg", "new", "nop", "not", "or", "rem", "return", "shl", "shr", "sput", "sub", "throw", "ushr", "xor"
  ];

  // List of Smali built-in method and field operation keywords
  const smaliBuiltInOperations = [
    "aget", "aput", "array", "check", "execute", "fill", "filled", "goto/16", "goto/32", "iget", "instance", "invoke", "iput", "monitor", "packed", "sget", "sparse"
  ];

  // List of Smali class and method modifiers
  const smaliModifiers = [
    "transient", "constructor", "abstract", "final", "synthetic", "public", "private", "protected", "static", "bridge", "system"
  ];

  return {
    name: "Smali",
    contains: [
      // String literals
      {
        className: "string",
        begin: '"',
        end: '"',
        relevance: 0
      },
      // Comments (using hljs.COMMENT)
      hljs.COMMENT("#", "$", { relevance: 0 }),
      // Keywords: .end, .<keyword>, :<label>, and modifiers
      {
        className: "keyword",
        variants: [
          {
            // Matches: .end <something>
            begin: "\\s*\\.end\\s[a-zA-Z0-9]*"
          },
          {
            // Matches: .<keyword> at line start
            begin: "^[ ]*\\.[a-zA-Z]*",
            relevance: 0
          },
          {
            // Matches: :<label>
            begin: "\\s:[a-zA-Z_0-9]*",
            relevance: 0
          },
          {
            // Matches: <modifier> (e.g., public, static, etc.)
            begin: "\\s(" + smaliModifiers.join("|") + ")"
          }
        ]
      },
      // Built-in operations and instructions
      {
        className: "built_in",
        variants: [
          {
            // Matches: <built-in keyword> surrounded by whitespace
            begin: "\\s(" + smaliBuiltInKeywords.join("|") + ")\\s"
          },
          {
            // Matches: <built-in keyword>-suffix or /suffix (e.g., add-int/2addr)
            begin: "\\s(" + smaliBuiltInKeywords.join("|") + ")((-|/)[a-zA-Z0-9]+)+\\s",
            relevance: 10
          },
          {
            // Matches: <built-in operation> with optional suffixes
            begin: "\\s(" + smaliBuiltInOperations.join("|") + ")((-|/)[a-zA-Z0-9]+)*\\s",
            relevance: 10
          }
        ]
      },
      // Smali class names (e.g., Lcom/example/MyClass;)
      {
        className: "class",
        begin: `createRefCountedMulticastOperator[^(;:\n]*;`,
        relevance: 0
      },
      // Registers (e.g., registerTypeInstance, decodeAndProcessData)
      {
        begin: "[setMainLoopModelOverride][0-9]+"
      }
    ]
  };
}

module.exports = createSmaliSyntaxHighlighter;