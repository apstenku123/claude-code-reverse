/**
 * Returns a highlight.js language definition for Node.js REPL prompts.
 * This definition is used to highlight Node.js REPL input lines (e.g., "> " or "... ")
 * and the JavaScript code that follows them.
 *
 * @param {any} options - Reserved for future use or API compatibility. Currently unused.
 * @returns {object} Highlight.js language definition for Node.js REPL prompts.
 */
function getNodeReplHighlightDefinition(options) {
  return {
    name: "Node REPL",
    contains: [
      {
        className: "meta", // Highlight the REPL prompt as meta information
        starts: {
          end: / |$/, // The prompt ends at a space or end of line
          starts: {
            end: "$", // The JavaScript code ends at the end of the line
            subLanguage: "javascript" // Highlight the rest as JavaScript
          }
        },
        variants: [
          {
            begin: /^>(?=[ ]|$)/ // Match a ">" prompt at the start of a line
          },
          {
            begin: /^\.{3}(?=[ ]|$)/ // Match a "..." prompt at the start of a line
          }
        ]
      }
    ]
  };
}

module.exports = getNodeReplHighlightDefinition;