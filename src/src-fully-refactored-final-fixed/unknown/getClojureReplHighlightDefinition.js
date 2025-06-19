/**
 * Returns a syntax highlighting definition for Clojure REPL prompts.
 *
 * This function provides a configuration object used by syntax highlighters
 * (such as highlight.js) to recognize and highlight Clojure REPL prompt lines.
 *
 * @param {any} options - Optional configuration or context (currently unused).
 * @returns {object} Syntax highlighting definition for Clojure REPL prompt lines.
 */
function getClojureReplHighlightDefinition(options) {
  return {
    name: "Clojure REPL",
    contains: [
      {
        className: "meta",
        // Match REPL prompt: optional symbol or whitespace + #_ followed by =>
        begin: /^([\w.-]+|\s*#_)?=>/,
        starts: {
          end: /$/,
          subLanguage: "clojure" // Highlight the rest of the line as Clojure code
        }
      }
    ]
  };
}

module.exports = getClojureReplHighlightDefinition;