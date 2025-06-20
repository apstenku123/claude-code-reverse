/**
 * Generates a syntax highlighting definition for ReasonML for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing built-in modes and helpers.
 * @returns {object} The ReasonML language definition object for highlight.js.
 */
function reasonMLHighlightDefinition(hljs) {
  /**
   * Escapes each character in a string and joins them with a backslash, then joins the array with '|'.
   * Used to build operator regexes.
   *
   * @param {string[]} operators - Array of operator strings to escape.
   * @returns {string} Regex string for the operators.
   */
  function escapeOperators(operators) {
    return operators
      .map(operator => operator.split("").map(char => "\\" + char).join(""))
      .join("|");
  }

  // Identifier regexes
  const lowerIdent = "~?[a-z$_][0-9a-zA-zA$_]*";
  const upperIdent = "`?[a-zA$_][0-9a-zA-zA$_]*";
  const lowerTickIdent = "'? [a-z$_][0-9a-z$_]*";

  // Type annotation regex
  const typeAnnotation = "\\s*:\\s*[a-z$_][0-9a-z$_]*(\\(\\s*(" + lowerTickIdent + "\\s*(," + lowerTickIdent + "\\s*)*)?\\))?";

  // Function parameter regex
  const functionParam = lowerIdent + "(" + typeAnnotation + "){0,2}";

  // Operator regex
  const operatorRegex = "(" + escapeOperators(["||", "++", "**", "+.", "*", "/", "*.", "/.", "..."]) + "|\\|>|&&|==|===)";
  const operatorWithSpaces = "\\s+" + operatorRegex + "\\s+";

  // Keywords, built-ins, and literals
  const keywords = {
    keyword:
      "and as asr assert begin class constraint do done downto else end exception external for fun function functor if in include inherit initializer land lazy let lor lsl lsr lxor match method mod module mutable new nonrec object of open or private rec sig struct then to try type val virtual when while with",
    built_in:
      "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 ref string unit ",
    literal: "true false"
  };

  // Number regex
  const numberRegex = "\\b(0[xX][a-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)";
  const numberMode = {
    className: "number",
    relevance: 0,
    variants: [
      { begin: numberRegex },
      { begin: "\\(-" + numberRegex + "\\)" }
    ]
  };

  // Operator mode
  const operatorMode = {
    className: "operator",
    relevance: 0,
    begin: operatorRegex
  };

  // Identifier and value modes
  const identifierModes = [
    {
      className: "identifier",
      relevance: 0,
      begin: lowerIdent
    },
    operatorMode,
    numberMode
  ];

  // Module name modes
  const moduleNameModes = [
    hljs.QUOTE_STRING_MODE,
    operatorMode,
    {
      className: "module",
      begin: "\\b" + upperIdent,
      returnBegin: true,
      end: ".",
      contains: [
        {
          className: "identifier",
          begin: upperIdent,
          relevance: 0
        }
      ]
    }
  ];

  // Used for module access and type annotations
  const moduleTypeModes = [
    {
      className: "module",
      begin: "\\b" + upperIdent,
      returnBegin: true,
      end: ".",
      relevance: 0,
      contains: [
        {
          className: "identifier",
          begin: upperIdent,
          relevance: 0
        }
      ]
    }
  ];

  // Function parameter list mode
  const functionParamListMode = {
    begin: lowerIdent,
    end: "(,|\\n|\\))",
    relevance: 0,
    contains: [
      operatorMode,
      {
        className: "typing",
        begin: ":",
        end: "(,|\\n)",
        returnBegin: true,
        relevance: 0,
        contains: moduleTypeModes
      }
    ]
  };

  // Function definition mode (lambda, arrow functions)
  const functionDefinitionMode = {
    className: "function",
    relevance: 0,
    keywords: keywords,
    variants: [
      {
        begin: "\\s(\\(\\.?.*?\\)|" + lowerIdent + ")\\s*=>",
        end: "\\s*=>",
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: "params",
            variants: [
              { begin: lowerIdent },
              { begin: functionParam },
              { begin: /\(\s*\)/ }
            ]
          }
        ]
      },
      {
        begin: "\\s\\(\\.?[^;\\|]*\\)\\s*=>",
        end: "\\s=>",
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: "params",
            relevance: 0,
            variants: [functionParamListMode]
          }
        ]
      },
      {
        begin: "\\(\\.\\s" + lowerIdent + "\\)\\s*=>"
      }
    ]
  };
  moduleNameModes.push(functionDefinitionMode);

  // Constructor mode
  const constructorMode = {
    className: "constructor",
    begin: upperIdent + "\\(",
    end: "\\)",
    illegal: "\\n",
    keywords: keywords,
    contains: [
      hljs.QUOTE_STRING_MODE,
      operatorMode,
      {
        className: "params",
        begin: "\\b" + lowerIdent
      }
    ]
  };

  // Pattern match mode
  const patternMatchMode = {
    className: "pattern-match",
    begin: "\\|",
    returnBegin: true,
    keywords: keywords,
    end: "=>",
    relevance: 0,
    contains: [
      constructorMode,
      operatorMode,
      {
        relevance: 0,
        className: "constructor",
        begin: upperIdent
      }
    ]
  };

  // Module access mode
  const moduleAccessMode = {
    className: "module-access",
    keywords: keywords,
    returnBegin: true,
    variants: [
      {
        begin: "\\b(" + upperIdent + "\\.)+" + lowerIdent
      },
      {
        begin: "\\b(" + upperIdent + "\\.)+\\(",
        end: "\\)",
        returnBegin: true,
        contains: [
          functionDefinitionMode,
          {
            begin: "\\(",
            end: "\\)",
            skip: true
          },
          ...moduleNameModes
        ]
      },
      {
        begin: "\\b(" + upperIdent + "\\.)+\\{",
        end: /\}/
      }
    ],
    contains: moduleNameModes
  };
  moduleTypeModes.push(moduleAccessMode);

  // Main language definition object
  return {
    name: "ReasonML",
    aliases: ["re"],
    keywords: keywords,
    illegal: "(:-|:=|\\$\\{|\\+=)",
    contains: [
      // Block comments
      hljs.COMMENT("/\*", "\\*/", {
        illegal: "^(#,\/\/)",
      }),
      // Character literals
      {
        className: "character",
        begin: "'(\\\\[^']+|[^'])'",
        illegal: "\\n",
        relevance: 0
      },
      // String literals
      hljs.QUOTE_STRING_MODE,
      // Unit literal
      {
        className: "literal",
        begin: "\\(\\)",
        relevance: 0
      },
      // Array literal
      {
        className: "literal",
        begin: "\\[\\|",
        end: "\\|\\]",
        relevance: 0,
        contains: identifierModes
      },
      // List literal
      {
        className: "literal",
        begin: "\\[",
        end: "\\]",
        relevance: 0,
        contains: identifierModes
      },
      // Constructor
      constructorMode,
      // Operator with spaces
      {
        className: "operator",
        begin: operatorWithSpaces,
        illegal: "-->",
        relevance: 0
      },
      // Numbers
      numberMode,
      // Single-line comments
      hljs.C_LINE_COMMENT_MODE,
      // Pattern matching
      patternMatchMode,
      // Function definitions
      functionDefinitionMode,
      // Module definition
      {
        className: "module-def",
        begin: "\\bmodule\\s+" + lowerIdent + "\\s+" + upperIdent + "\\s+=\\s+\\{",
        end: /\}/,
        returnBegin: true,
        keywords: keywords,
        relevance: 0,
        contains: [
          {
            className: "module",
            relevance: 0,
            begin: upperIdent
          },
          {
            begin: /\{/,
            end: /\}/,
            skip: true
          },
          ...moduleNameModes
        ]
      },
      // Module access
      moduleAccessMode
    ]
  };
}

module.exports = reasonMLHighlightDefinition;