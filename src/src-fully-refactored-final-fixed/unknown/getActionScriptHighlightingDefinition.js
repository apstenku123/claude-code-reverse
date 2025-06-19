/**
 * Returns the syntax highlighting definition for ActionScript for use with a highlighting library (e.g., highlight.js).
 *
 * @param {object} hljs - The highlighting library instance providing common language modes and utilities.
 * @returns {object} The ActionScript language definition object for syntax highlighting.
 */
function getActionScriptHighlightingDefinition(hljs) {
  // Regular expression to match valid ActionScript identifiers
  const IDENTIFIER_REGEX = /[a-zA-Z_$][a-zA-Z0-9_$]*/;

  // Regular expression to match either '*' or a valid identifier (for type annotations)
  const TYPE_ANNOTATION_REGEX = /([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)/;

  // Definition for rest arguments (e.g., ...args)
  const REST_ARGUMENT_MODE = {
    className: "rest_arg",
    begin: /[.]{3}/, // Matches '...'
    end: IDENTIFIER_REGEX, // Followed by an identifier
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
      // String, comment, and number modes from hljs
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      // Package declaration
      {
        className: "class",
        beginKeywords: "package",
        end: /\{/, // Ends at opening brace
        contains: [hljs.TITLE_MODE]
      },
      // Class or interface declaration
      {
        className: "class",
        beginKeywords: "class interface",
        end: /\{/, // Ends at opening brace
        excludeEnd: true, // normalizeToError not include the brace in the match
        contains: [
          {
            beginKeywords: "extends implements" // Matches inheritance and interface implementation
          },
          hljs.TITLE_MODE
        ]
      },
      // Import/include meta statements
      {
        className: "meta",
        beginKeywords: "import include",
        end: /;/, // Ends at semicolon
        keywords: {
          "meta-keyword": "import include"
        }
      },
      // Function declaration
      {
        className: "function",
        beginKeywords: "function",
        end: /[\{;]/, // Ends at opening brace or semicolon
        excludeEnd: true, // normalizeToError not include the brace/semicolon in the match
        illegal: /\s/, // Illegal to have non-whitespace before function
        contains: [
          hljs.TITLE_MODE, // Function name
          {
            className: "params",
            begin: /\(/, // Start of parameter list
            end: /\)/, // End of parameter list
            contains: [
              hljs.APOS_STRING_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              REST_ARGUMENT_MODE // Rest arguments inside parameter list
            ]
          },
          {
            // Type annotation after function signature (e.g., ": String")
            begin: concatenateSourcePatterns(/:\s*/, TYPE_ANNOTATION_REGEX)
          }
        ]
      },
      // Method guard from hljs (prevents illegal method matches)
      hljs.METHOD_GUARD
    ],
    // Illegal to have '#' in ActionScript
    illegal: /#/
  };
}

module.exports = getActionScriptHighlightingDefinition;