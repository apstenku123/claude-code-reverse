/**
 * Returns a syntax highlighting definition object for Node.js REPL prompts.
 * This is intended for use with syntax highlighters (e.g., highlight.js) to recognize
 * Node.js REPL prompt lines (e.g., "> " or "... ") and apply appropriate highlighting.
 *
 * @param {any} _unusedParam - (Unused) Placeholder parameter for API compatibility.
 * @returns {object} Highlighting definition for Node.js REPL prompts.
 */
function getNodeReplHighlightingDefinition(_unusedParam) {
  return {
    name: "Node REPL",
    contains: [
      {
        className: "meta",
        // Start matching after the REPL prompt (either "> " or "... ")
        starts: {
          end: / |$/,
          starts: {
            end: "$",
            subLanguage: "javascript" // Highlight the REPL input as JavaScript
          }
        },
        variants: [
          {
            begin: /^>(?=[ ]|$)/ // Matches lines starting with '> ' or '>'
          },
          {
            begin: /^\.\.\.(?=[ ]|$)/ // Matches lines starting with '... ' or '...'
          }
        ]
      }
    ]
  };
}

module.exports = getNodeReplHighlightingDefinition;