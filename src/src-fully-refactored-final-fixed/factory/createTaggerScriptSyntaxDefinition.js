/**
 * Factory function that returns a syntax highlighting definition for Tagger Script.
 * This is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} syntaxHighlighter - The syntax highlighter instance or context (not used in this function, but included for compatibility).
 * @returns {object} Syntax definition object for Tagger Script.
 */
function createTaggerScriptSyntaxDefinition(syntaxHighlighter) {
  return {
    name: "Tagger Script",
    contains: [
      {
        className: "comment",
        // Matches $noop(...) as a comment
        begin: /\$noop\(/,
        end: /\)/,
        contains: [
          {
            // Handles nested parentheses inside $noop(...)
            begin: /\(/,
            end: /\)/,
            contains: [
              "self",
              {
                // Matches escaped characters inside the comment
                begin: /\./
              }
            ]
          }
        ],
        relevance: 10 // High relevance to prioritize this pattern
      },
      {
        className: "keyword",
        // Matches $keyword( but not $noop(
        begin: /\$(?!noop)[a-zA-Z][_a-zA-Z0-9]*/,
        end: /\(/,
        excludeEnd: true // Exclude the '(' from the matched keyword
      },
      {
        className: "variable",
        // Matches variables like %varName% or %var:name%
        begin: /%[_a-zA-Z0-9:]*/,
        end: "%"
      },
      {
        className: "symbol",
        // Matches escaped characters (e.g., \n, \processRuleBeginHandlers)
        begin: /\./
      }
    ]
  };
}

module.exports = createTaggerScriptSyntaxDefinition;