/**
 * Factory function that defines the syntax highlighting configuration for CoffeeScript.
 *
 * @param {object} hljs - The highlight.js instance, providing language modes and utilities.
 * @returns {object} The CoffeeScript language definition for highlight.js.
 */
function createCoffeeScriptHighlighting(hljs) {
  // Built-in identifiers
  const BUILT_INS = ["npm", "print"];
  // Literal values
  const LITERALS = ["yes", "no", "on", "off"];
  // CoffeeScript keywords
  const COFFEESCRIPT_KEYWORDS = [
    "then", "unless", "until", "loop", "by", "when", "and", "or", "is", "isnt", "not"
  ];
  // JavaScript variable declaration keywords
  const VARIABLE_KEYWORDS = ["var", "const", "let", "function", "static"];

  /**
   * Returns a function that checks if a keyword is NOT in the given list.
   * Used to filter out keywords that are also variable declaration keywords.
   * @param {string[]} excludedKeywords
   * @returns {function(string): boolean}
   */
  const isNotInList = excludedKeywords => keyword => !excludedKeywords.includes(keyword);

  // Compose the keywords object for highlight.js
  const keywords = {
    // Filter out variable declaration keywords from the full keyword list
    keyword: Ou9.concat(COFFEESCRIPT_KEYWORDS).filter(isNotInList(VARIABLE_KEYWORDS)),
    literal: Tu9.concat(LITERALS),
    built_in: ku9.concat(BUILT_INS)
  };

  // Identifier regex (CoffeeScript/JS variable names)
  const IDENTIFIER = "[a-z$_][0-9A-zA-z$_]*";

  // Interpolated expression inside strings (e.g., "Hello #{name}")
  const INTERPOLATION = {
    className: "subst",
    begin: /#\{/,
    end: /\}/,
    keywords: keywords
  };

  // String and number modes
  const MODES = [
    hljs.BINARY_NUMBER_MODE,
    // Inherit C_NUMBER_MODE but allow optional trailing slash
    hljs.inherit(hljs.C_NUMBER_MODE, {
      starts: {
        end: "(\\s*/)?",
        relevance: 0
      }
    }),
    // String modes (single, double, triple quotes)
    {
      className: "string",
      variants: [
        {
          begin: /'''/,
          end: /'''/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /'/,
          end: /'/,
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: /"""/,
          end: /"""/,
          contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION]
        },
        {
          begin: /"/,
          end: /"/,
          contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION]
        }
      ]
    },
    // Regular expression modes
    {
      className: "regexp",
      variants: [
        {
          begin: "///",
          end: "///",
          contains: [INTERPOLATION, hljs.HASH_COMMENT_MODE]
        },
        {
          begin: "//[gim]{0,3}(?=\\W)",
          relevance: 0
        },
        {
          begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/
        }
      ]
    },
    // Instance variable (e.g., @foo)
    {
      begin: "@" + IDENTIFIER
    },
    // Embedded JavaScript (fenced or inline)
    {
      subLanguage: "javascript",
      excludeBegin: true,
      excludeEnd: true,
      variants: [
        {
          begin: "```",
          end: "```"
        },
        {
          begin: "`",
          end: "`"
        }
      ]
    }
  ];

  // Allow interpolation to contain all string/number/regexp modes
  INTERPOLATION.contains = MODES;

  // Function/variable/class name mode
  const TITLE_MODE = hljs.inherit(hljs.TITLE_MODE, {
    begin: IDENTIFIER
  });

  // Arrow function regex (with optional params)
  const ARROW_FUNCTION = "(\\(.*\\)\\s*)?\\b[-=]>";

  // Function parameters mode
  const PARAMS_MODE = {
    className: "params",
    begin: "\\([^\\(]", // Open parenthesis not followed by another '('
    returnBegin: true,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        keywords: keywords,
        contains: ["self"].concat(MODES)
      }
    ]
  };

  return {
    name: "CoffeeScript",
    aliases: ["coffee", "cson", "iced"],
    keywords: keywords,
    illegal: /\/\*/, // Illegal: block comments (not CoffeeScript)
    contains: MODES.concat([
      // Block comment (### ... ###)
      hljs.COMMENT("###", "###"),
      // Hash comment (# ...)
      hljs.HASH_COMMENT_MODE,
      // Function definition (e.g., foo = ->)
      {
        className: "function",
        begin: "^\\s*" + IDENTIFIER + "\\s*=\\s*" + ARROW_FUNCTION,
        end: "[-=]>",
        returnBegin: true,
        contains: [TITLE_MODE, PARAMS_MODE]
      },
      // Inline function (e.g., : ->)
      {
        begin: /[:\(,=]\s*/,
        relevance: 0,
        contains: [
          {
            className: "function",
            begin: ARROW_FUNCTION,
            end: "[-=]>",
            returnBegin: true,
            contains: [PARAMS_MODE]
          }
        ]
      },
      // Class definition
      {
        className: "class",
        beginKeywords: "class",
        end: "$",
        illegal: /[:="\[\]]/,
        contains: [
          {
            beginKeywords: "extends",
            endsWithParent: true,
            illegal: /[:="\[\]]/,
            contains: [TITLE_MODE]
          },
          TITLE_MODE
        ]
      },
      // Object property (e.g., foo:)
      {
        begin: IDENTIFIER + ":",
        end: ":",
        returnBegin: true,
        returnEnd: true,
        relevance: 0
      }
    ])
  };
}

module.exports = createCoffeeScriptHighlighting;