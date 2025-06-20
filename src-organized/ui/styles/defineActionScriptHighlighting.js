/**
 * Defines syntax highlighting rules for ActionScript language for a highlighting engine (such as highlight.js).
 *
 * @param {object} hljs - The highlighting engine instance, providing standard language modes and utilities.
 * @returns {object} Language definition object for ActionScript highlighting.
 */
function defineActionScriptHighlighting(hljs) {
  // Regular expression for valid ActionScript identifiers
  const IDENTIFIER_REGEX = /[a-zA-Z_$][a-zA-Z0-9_$]*/;
  // Regular expression for type annotations (e.g., :Type or :*)
  const TYPE_ANNOTATION_REGEX = /([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)/;

  // Definition for rest arguments (e.g., ...args)
  const REST_ARGUMENT_MODE = {
    className: "rest_arg",
    begin: /[.]{3}/, // Matches '...'
    end: IDENTIFIER_REGEX,
    relevance: 10
  };

  return {
    name: "ActionScript",
    aliases: ["as"],
    keywords: {
      keyword:
        "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",
      literal: "true false null undefined"
    },
    contains: [
      hljs.APOS_STRING_MODE, // Single-quoted strings
      hljs.QUOTE_STRING_MODE, // Double-quoted strings
      hljs.C_LINE_COMMENT_MODE, // Single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // Multi-line comments
      hljs.C_NUMBER_MODE, // Numbers
      {
        // Package declaration
        className: "class",
        beginKeywords: "package",
        end: /\{/, // Ends at opening brace
        contains: [hljs.TITLE_MODE]
      },
      {
        // Class or interface declaration
        className: "class",
        beginKeywords: "class interface",
        end: /\{/, // Ends at opening brace
        excludeEnd: true, // Exclude the ending brace from the match
        contains: [
          {
            // Extends or implements clause
            beginKeywords: "extends implements"
          },
          hljs.TITLE_MODE
        ]
      },
      {
        // Import or include statement
        className: "meta",
        beginKeywords: "import include",
        end: /;/, // Ends at semicolon
        keywords: {
          "meta-keyword": "import include"
        }
      },
      {
        // Function declaration
        className: "function",
        beginKeywords: "function",
        end: /[\{;]/, // Ends at opening brace or semicolon
        excludeEnd: true, // Exclude the ending character from the match
        illegal: /\s/, // Illegal to have non-whitespace before function
        contains: [
          hljs.TITLE_MODE, // Function name
          {
            // Function parameters
            className: "params",
            begin: /\(/,
            end: /\)/,
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              REST_ARGUMENT_MODE // ...args
            ]
          },
          {
            // Type annotation after colon (e.g., :Type)
            begin: concatenateSourcePatterns(/:\s*/, TYPE_ANNOTATION_REGEX)
          }
        ]
      },
      hljs.METHOD_GUARD // Guard for method definitions
    ],
    illegal: /#/ // Illegal character in ActionScript
  };
}

module.exports = defineActionScriptHighlighting;