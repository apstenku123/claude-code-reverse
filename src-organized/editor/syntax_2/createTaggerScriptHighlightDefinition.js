/**
 * Factory function that returns a syntax highlighting definition for Tagger Script.
 * This is intended for use with syntax highlighting libraries (e.g., highlight.js).
 *
 * @param {object} syntaxHighlighter - The syntax highlighter instance or context (not used directly, but required by API).
 * @returns {object} Highlight.js language definition object for Tagger Script.
 */
function createTaggerScriptHighlightDefinition(syntaxHighlighter) {
  return {
    name: "Tagger Script",
    contains: [
      {
        className: "comment",
        // Matches $noop(...) style comments
        begin: /\$noop\(/,
        end: /\)/,
        contains: [
          {
            // Handles nested parentheses and escaped characters inside $noop
            begin: /\(/,
            end: /\)/,
            contains: [
              "self",
              {
                // Matches escaped characters (e.g., \n, \processRuleBeginHandlers)
                begin: /\./
              }
            ]
          }
        ],
        relevance: 10
      },
      {
        className: "keyword",
        // Matches $keyword(...) but not $noop
        begin: /\$(?!noop)[a-zA-Z][_a-zA-Z0-9]*/,
        end: /\(/,
        excludeEnd: true
      },
      {
        className: "variable",
        // Matches variables like %varName%
        begin: /%[_a-zA-Z0-9:]*/,
        end: "%"
      },
      {
        className: "symbol",
        // Matches escaped characters (e.g., \n, \processRuleBeginHandlers) outside comments
        begin: /\./
      }
    ]
  };
}

module.exports = createTaggerScriptHighlightDefinition;