/**
 * Defines the syntax highlighting configuration for ReasonML language for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance, providing built-in modes and helpers.
 * @returns {object} The configuration object describing ReasonML syntax highlighting rules.
 */
function defineReasonMLHighlighting(hljs) {
  /**
   * Escapes each character in the given array of operator strings for use in regex alternation.
   *
   * @param {string[]} operators - Array of operator strings to escape.
   * @returns {string} Regex alternation string of escaped operators.
   */
  function escapeOperatorsForRegex(operators) {
    return operators
      .map(operator => operator.split("").map(char => "\\" + char).join(""))
      .join("|");
  }

  // Identifier patterns
  const identifierPattern = "~?[a-z$_][0-9a-zA-zA$_]*";
  const moduleIdentifierPattern = "`?[a-zA$_][0-9a-zA-zA$_]*";
  const typeVarPattern = "'?[a-z$_][0-9a-z$_]*";

  // Type annotation pattern (e.g., : type)
  const typeAnnotationPattern = "\\s*:\\s*[a-z$_][0-9a-z$_]*(\\(\\s*(" + typeVarPattern + "\\s*(," + typeVarPattern + "\\s*)*)?\\))?";

  // Function parameter pattern
  const functionParamPattern = identifierPattern + "(" + typeAnnotationPattern + "){0,2}";

  // Operator regex pattern
  const operatorAlternation = "(" + escapeOperatorsForRegex(["||", "++", "**", "+.", "*", "/", "*.", "/.", "..."]) + "|\\|>|&&|==|===)";
  const operatorWithSpacesPattern = "\\s+" + operatorAlternation + "\\s+";

  // Keywords, built-ins, and literals
  const keywords = {
    keyword:
      "and as asr assert begin class constraint do done downto else end exception external for fun function functor if in include inherit initializer land lazy let lor lsl lsr lxor match method mod module mutable new nonrec object of open or private rec sig struct then to try type val virtual when while with",
    built_in:
      "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 ref string unit ",
    literal: "true false"
  };

  // Number literal regex
  const numberPattern =
    "\\b(0[xX][a-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)";

  // Number mode
  const numberMode = {
    className: "number",
    relevance: 0,
    variants: [
      { begin: numberPattern },
      { begin: "\\(-" + numberPattern + "\\)" }
    ]
  };

  // Operator mode
  const operatorMode = {
    className: "operator",
    relevance: 0,
    begin: operatorAlternation
  };

  // Identifier and value modes
  const identifierModes = [
    {
      className: "identifier",
      relevance: 0,
      begin: identifierPattern
    },
    operatorMode,
    numberMode
  ];

  // Module access and definition modes
  const moduleModes = [
    hljs.QUOTE_STRING_MODE,
    operatorMode,
    {
      className: "module",
      begin: "\\b" + moduleIdentifierPattern,
      returnBegin: true,
      end: ".",
      contains: [
        {
          className: "identifier",
          begin: moduleIdentifierPattern,
          relevance: 0
        }
      ]
    }
  ];

  const moduleReferenceModes = [
    {
      className: "module",
      begin: "\\b" + moduleIdentifierPattern,
      returnBegin: true,
      end: ".",
      relevance: 0,
      contains: [
        {
          className: "identifier",
          begin: moduleIdentifierPattern,
          relevance: 0
        }
      ]
    }
  ];

  // Function parameter destructuring mode
  const functionParamDestructuringMode = {
    begin: identifierPattern,
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
        contains: moduleReferenceModes
      }
    ]
  };

  // Function definition mode
  const functionMode = {
    className: "function",
    relevance: 0,
    keywords: keywords,
    variants: [
      {
        // e.g. (param) => or param =>
        begin: "\\s(\\(\\.?.*?\\)|" + identifierPattern + ")\\s*=>",
        end: "\\s*=>",
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: "params",
            variants: [
              { begin: identifierPattern },
              { begin: functionParamPattern },
              { begin: /\(\s*\)/ }
            ]
          }
        ]
      },
      {
        // e.g. (. param1, param2) =>
        begin: "\\s\\(\\.?[^;\\|]*\\)\\s*=>",
        end: "\\s=>",
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: "params",
            relevance: 0,
            variants: [functionParamDestructuringMode]
          }
        ]
      },
      {
        // e.g. (. param) =>
        begin: "\\(\\.\\s" + identifierPattern + "\\)\\s*=>"
      }
    ]
  };

  // Add functionMode to moduleModes
  moduleModes.push(functionMode);

  // Constructor mode (e.g. Type(...))
  const constructorMode = {
    className: "constructor",
    begin: moduleIdentifierPattern + "\\(",
    end: "\\)",
    illegal: "\\n",
    keywords: keywords,
    contains: [
      hljs.QUOTE_STRING_MODE,
      operatorMode,
      {
        className: "params",
        begin: "\\b" + identifierPattern
      }
    ]
  };

  // Pattern match mode (e.g. | ... =>)
  const patternMatchMode = {
    className: "pattern-match",
    begin: "|",
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
        begin: moduleIdentifierPattern
      }
    ]
  };

  // Module access mode (e.g. Module.Submodule.value)
  const moduleAccessMode = {
    className: "module-access",
    keywords: keywords,
    returnBegin: true,
    variants: [
      {
        begin: "\\b(" + moduleIdentifierPattern + "\\.)+" + identifierPattern
      },
      {
        begin: "\\b(" + moduleIdentifierPattern + "\\.)+\\(",
        end: "\\)",
        returnBegin: true,
        contains: [
          functionMode,
          {
            begin: "\\(",
            end: "\\)",
            skip: true
          },
          ...moduleModes
        ]
      },
      {
        begin: "\\b(" + moduleIdentifierPattern + "\\.)+\\{",
        end: /\}/
      }
    ],
    contains: moduleModes
  };

  // Add moduleAccessMode to moduleReferenceModes
  moduleReferenceModes.push(moduleAccessMode);

  // Main ReasonML highlighting configuration object
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
      // Unit literal ()
      {
        className: "literal",
        begin: "\\(\\)",
        relevance: 0
      },
      // Array literal [| ... |]
      {
        className: "literal",
        begin: "\\[\\|",
        end: "\\|\\]",
        relevance: 0,
        contains: identifierModes
      },
      // List literal [ ... ]
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
        begin: operatorWithSpacesPattern,
        illegal: "-->",
        relevance: 0
      },
      // Number literals
      numberMode,
      // Line comments
      hljs.C_LINE_COMMENT_MODE,
      // Pattern matching
      patternMatchMode,
      // Function definitions
      functionMode,
      // Module definition
      {
        className: "module-def",
        begin: "\\bmodule\\s+" + identifierPattern + "\\s+" + moduleIdentifierPattern + "\\s+=\\s+\\{",
        end: /\}/,
        returnBegin: true,
        keywords: keywords,
        relevance: 0,
        contains: [
          {
            className: "module",
            relevance: 0,
            begin: moduleIdentifierPattern
          },
          {
            begin: /\{/,
            end: /\}/,
            skip: true
          },
          ...moduleModes
        ]
      },
      // Module access
      moduleAccessMode
    ]
  };
}

module.exports = defineReasonMLHighlighting;