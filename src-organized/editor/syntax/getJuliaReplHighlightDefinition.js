/**
 * Returns a syntax highlighting definition for Julia REPL prompts.
 *
 * This function provides a configuration object for a syntax highlighter (such as highlight.js)
 * to recognize and highlight Julia REPL prompts and their associated doctest blocks.
 *
 * @param {any} options - (Unused) Options object for future extensibility.
 * @returns {object} Highlighting definition for Julia REPL prompts.
 */
function getJuliaReplHighlightDefinition(options) {
  return {
    name: "Julia REPL",
    contains: [
      {
        className: "meta",
        // Match lines that start with 'julia>'
        begin: /^julia>/,
        relevance: 10,
        starts: {
          // End highlighting when the line does not have at least 6 leading spaces
          end: /^(?![ ]{6})/,
          subLanguage: "julia"
        },
        aliases: ["jldoctest"]
      }
    ]
  };
}

module.exports = getJuliaReplHighlightDefinition;