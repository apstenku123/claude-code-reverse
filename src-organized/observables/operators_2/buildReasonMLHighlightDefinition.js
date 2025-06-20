/**
 * Constructs a ReasonML syntax highlighting definition for use with a highlighting engine (e.g., highlight.js).
 *
 * @param {object} hljs - The highlighting engine instance, providing built-in modes and helpers.
 * @returns {object} The ReasonML language definition object for the highlighting engine.
 */
function buildReasonMLHighlightDefinition(hljs) {
  /**
   * Escapes each character in a list of operators for use in regex alternation.
   *
   * @param {string[]} operators - Array of operator strings.
   * @returns {string} Regex alternation string of escaped operators.
   */
  function escapeOperatorsForRegex(operators) {
    return operators
      .map(operator => operator.split("").map(char => "\\" + char).join(""))
      .join("|");
  }

  // Identifier regexes
  const identifier = "~?[a-z$_][0-9a-zA-zA$_]*";
  const moduleIdentifier = "`?[a-zA$_][0-9a-zA-zA$_]*";
  const typeVarIdentifier = "'? [a-z$_][0-9a-z$_]*";

  // Type annotation regex
  const typeAnnotation =
    "\\s*:\\s*[a-z$_][0-9a-z$_]*(\\(\\s*(" + typeVarIdentifier + "\\s*(," + typeVarIdentifier + "\\s*)*)?\\))?";
  const parameterWithType = identifier + "(" + typeAnnotation + "){0,2}";

  // Operator regex
  const operatorAlternation =
    "(" +
    escapeOperatorsForRegex(["||", "++", "**", "+.", "*", "/", "*.", "/.", "..."]) +
    "|\\|>|&&|==|===)";
  const operatorWithWhitespace = "\\s+" + operatorAlternation + "\\s+";

  // Keywords, built-ins, literals
  const keywords = {
    keyword:
      "and as asr assert begin class constraint do done downto else end exception external for fun function functor if in include inherit initializer land lazy let lor lsl lsr lxor match method mod module mutable new nonrec object of open or private rec sig struct then to try type val virtual when while with",
    built_in:
      "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 ref string unit ",
    literal: "true false"
  };

  // Number regex
  const numberPattern =
    "\\b(0[xX][a-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)";
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

  // Identifier, operator, and number modes for use in arrays
  const basicModes = [
    {
      className: "identifier",
      relevance: 0,
      begin: identifier
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
      begin: "\\b" + moduleIdentifier,
      returnBegin: true,
      end: ".",
      contains: [
        {
          className: "identifier",
          begin: moduleIdentifier,
          relevance: 0
        }
      ]
    }
  ];

  const moduleReferenceModes = [
    {
      className: "module",
      begin: "\\b" + moduleIdentifier,
      returnBegin: true,
      end: ".",
      relevance: 0,
      contains: [
        {
          className: "identifier",
          begin: moduleIdentifier,
          relevance: 0
        }
      ]
    }
  ];

  // Function parameter mode for destructuring and type annotations
  const functionParameterMode = {
    begin: identifier,
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

  // Function definition mode (lambda, arrow functions, etc.)
  const functionMode = {
    className: "function",
    relevance: 0,
    keywords: keywords,
    variants: [
      {
        // e.g.  (param) => or param =>
        begin: "\\s(\\(\\.?.*?\\)|" + identifier + ")\\s*=>",
        end: "\\s*=>",
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: "params",
            variants: [
              { begin: identifier },
              { begin: parameterWithType },
              { begin: /\(\s*\)/ }
            ]
          }
        ]
      },
      {
        // e.g.  (. param1, param2) =>
        begin: "\\s\\(\\.?[^;\\|]*\\)\\s*=>",
        end: "\\s=>",
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: "params",
            relevance: 0,
            variants: [functionParameterMode]
          }
        ]
      },
      {
        // e.g.  (. param) =>
        begin: "\\(\\.\\s" + identifier + "\\)\\s*=>"
      }
    ]
  };
  moduleModes.push(functionMode);

  // Constructor mode (e.g. Some(...))
  const constructorMode = {
    className: "constructor",
    begin: moduleIdentifier + "\\(",
    end: "\\)",
    illegal: "\\n",
    keywords: keywords,
    contains: [
      hljs.QUOTE_STRING_MODE,
      operatorMode,
      {
        className: "params",
        begin: "\\b" + identifier
      }
    ]
  };

  // Pattern match mode (e.g. | Some x => ...)
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
        begin: moduleIdentifier
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
        begin: "\\b(" + moduleIdentifier + "\\.)+" + identifier
      },
      {
        begin: "\\b(" + moduleIdentifier + "\\.)+\\(",
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
        begin: "\\b(" + moduleIdentifier + "\\.)+\\{",
        end: /\}/
      }
    ],
    contains: moduleModes
  };
  moduleReferenceModes.push(moduleAccessMode);

  // Final language definition object
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
      // Character literal
      {
        className: "character",
        begin: "'(\\\\[^']+|[^'])'",
        illegal: "\\n",
        relevance: 0
      },
      // String literal
      hljs.QUOTE_STRING_MODE,
      // Unit literal
      {
        className: "literal",
        begin: "\\(\\)",
        relevance: 0
      },
      // Array literal (e.g. [| ... |])
      {
        className: "literal",
        begin: "\\[\\|",
        end: "\\|\\]",
        relevance: 0,
        contains: basicModes
      },
      // List literal (e.g. [ ... ])
      {
        className: "literal",
        begin: "\\[",
        end: "\\]",
        relevance: 0,
        contains: basicModes
      },
      // Constructor
      constructorMode,
      // Operator with whitespace
      {
        className: "operator",
        begin: operatorWithWhitespace,
        illegal: "-->",
        relevance: 0
      },
      // Number
      numberMode,
      // Line comment
      hljs.C_LINE_COMMENT_MODE,
      // Pattern match
      patternMatchMode,
      // Function
      functionMode,
      // Module definition (e.g. module X processCssDeclarations = { ... })
      {
        className: "module-def",
        begin: "\\bmodule\\s+" + identifier + "\\s+" + moduleIdentifier + "\\s+=\\s+\\{",
        end: /\}/,
        returnBegin: true,
        keywords: keywords,
        relevance: 0,
        contains: [
          {
            className: "module",
            relevance: 0,
            begin: moduleIdentifier
          },
          {
            begin: /\{/, end: /\}/, skip: true
          },
          ...moduleModes
        ]
      },
      // Module access
      moduleAccessMode
    ]
  };
}

module.exports = buildReasonMLHighlightDefinition;