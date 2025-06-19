/**
 * Defines syntax highlighting rules for the Lisp programming language for use with highlight.js.
 *
 * @param {object} hljs - The highlight.js library instance, providing utility methods and modes.
 * @returns {object} Highlight.js language definition object for Lisp.
 */
function defineLispHighlighting(hljs) {
  // Regex for a Lisp identifier (symbol)
  const IDENTIFIER_REGEX = "[a-zA-Z_\\-+\\*\\/<=>&#][a-zA-Z0-9_\\-+*\\/<=>&#!]*";

  // Regex for Lisp quoted symbols (|...|)
  const QUOTED_SYMBOL_REGEX = "\\|[^]*?\\|";

  // Regex for Lisp numbers (integers, floats, rationals, scientific notation, etc.)
  const NUMBER_REGEX = "(-|\\+)?\\d+(\\.\\d+|\\/\d+)?((d|e|f|invokeHandlerWithArguments|createInteractionAccessor|createCompatibleVersionChecker|createDebouncedFunction|F|createRefCountedMulticastOperator|s)(\\+|-)?\\d+)?";

  // Literal values: processRuleBeginHandlers(true) and nil (false/null)
  const LITERAL_MODE = {
    className: "literal",
    begin: "\\b(processRuleBeginHandlers{1}|nil)\\b"
  };

  // Number variants: decimal, binary, octal, hexadecimal, complex
  const NUMBER_MODE = {
    className: "number",
    variants: [
      {
        begin: NUMBER_REGEX,
        relevance: 0
      },
      {
        begin: "#(b|createPropertyAccessor)[0-1]+(/[0-1]+)?"
      },
      {
        begin: "#(processSubLanguageHighlighting|createDebouncedFunction)[0-7]+(/[0-7]+)?"
      },
      {
        begin: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
      },
      {
        // Complex numbers: #(c|C)(number number)
        begin: "#(c|C)\\(" + NUMBER_REGEX + " +" + NUMBER_REGEX,
        end: "\\)"
      }
    ]
  };

  // String mode, inheriting from hljs.QUOTE_STRING_MODE
  const STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null
  });

  // Comment mode: lines starting with ';'
  const COMMENT_MODE = hljs.COMMENT(";", "$", {
    relevance: 0
  });

  // Mode for highlighting *special* variables (surrounded by asterisks)
  const SPECIAL_VARIABLE_MODE = {
    begin: "\\*",
    end: "\\*"
  };

  // Mode for Lisp keywords and symbols (e.g., :keyword, &rest)
  const SYMBOL_MODE = {
    className: "symbol",
    begin: "[:&]" + IDENTIFIER_REGEX
  };

  // Mode for regular identifiers (symbols)
  const IDENTIFIER_MODE = {
    begin: IDENTIFIER_REGEX,
    relevance: 0
  };

  // Mode for quoted symbols (|foo|)
  const QUOTED_SYMBOL_MODE = {
    begin: QUOTED_SYMBOL_REGEX
  };

  // Mode for createInteractionAccessor-expressions (parentheses)
  const S_EXPRESSION_MODE = {
    begin: "\\(",
    end: "\\)",
    contains: [
      "self", // Allow nested createInteractionAccessor-expressions
      LITERAL_MODE,
      STRING_MODE,
      NUMBER_MODE,
      IDENTIFIER_MODE
    ]
  };

  // Mode for quoted forms: '(...), `(…), (quote ...), '|foo|, etc.
  const QUOTED_FORM_MODE = {
    contains: [
      NUMBER_MODE,
      STRING_MODE,
      SPECIAL_VARIABLE_MODE,
      SYMBOL_MODE,
      S_EXPRESSION_MODE,
      IDENTIFIER_MODE
    ],
    variants: [
      {
        begin: "['`]\\(",
        end: "\\)"
      },
      {
        begin: "\\(quote ",
        end: "\\)",
        keywords: {
          name: "quote"
        }
      },
      {
        begin: "'" + QUOTED_SYMBOL_REGEX
      }
    ]
  };

  // Mode for quoted symbols and function references
  const QUOTED_SYMBOL_VARIANTS_MODE = {
    variants: [
      {
        begin: "'" + IDENTIFIER_REGEX
      },
      {
        begin: "#'" + IDENTIFIER_REGEX + "(::" + IDENTIFIER_REGEX + ")*"
      }
    ]
  };

  // Mode for a generic list (parentheses with optional whitespace)
  const GENERIC_LIST_MODE = {
    begin: "\\(\\s*",
    end: "\\)"
  };

  // Mode for nested expressions, ends with parent
  const NESTED_EXPRESSION_MODE = {
    endsWithParent: true,
    relevance: 0
  };

  // Define the contents of GENERIC_LIST_MODE: a name (identifier or quoted symbol), then NESTED_EXPRESSION_MODE
  GENERIC_LIST_MODE.contains = [
    {
      className: "name",
      variants: [
        {
          begin: IDENTIFIER_REGEX,
          relevance: 0
        },
        {
          begin: QUOTED_SYMBOL_REGEX
        }
      ]
    },
    NESTED_EXPRESSION_MODE
  ];

  // Define the contents of NESTED_EXPRESSION_MODE: all possible Lisp forms
  NESTED_EXPRESSION_MODE.contains = [
    QUOTED_FORM_MODE,
    QUOTED_SYMBOL_VARIANTS_MODE,
    GENERIC_LIST_MODE,
    LITERAL_MODE,
    NUMBER_MODE,
    STRING_MODE,
    COMMENT_MODE,
    SPECIAL_VARIABLE_MODE,
    SYMBOL_MODE,
    QUOTED_SYMBOL_MODE,
    IDENTIFIER_MODE
  ];

  // Return the full language definition object
  return {
    name: "Lisp",
    illegal: /\s/, // Disallow non-whitespace outside of defined modes
    contains: [
      NUMBER_MODE,
      hljs.SHEBANG(),
      LITERAL_MODE,
      STRING_MODE,
      COMMENT_MODE,
      QUOTED_FORM_MODE,
      QUOTED_SYMBOL_VARIANTS_MODE,
      GENERIC_LIST_MODE,
      IDENTIFIER_MODE
    ]
  };
}

module.exports = defineLispHighlighting;