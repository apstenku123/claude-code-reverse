/**
 * Returns a syntax highlighting definition object for Clojure REPL prompts.
 *
 * This function provides a configuration object used by syntax highlighters (such as highlight.js)
 * to recognize and highlight Clojure REPL prompt lines. It matches lines that begin with a REPL prompt
 * (e.g., 'user=>', '=>', or with optional '#_' comment suppression), and then applies Clojure syntax highlighting
 * to the rest of the line.
 *
 * @param {any} options - (Unused) Reserved for future configuration options.
 * @returns {Object} Syntax definition object for Clojure REPL highlighting.
 */
function getClojureReplSyntaxDefinition(options) {
  return {
    name: "Clojure REPL",
    contains: [
      {
        className: "meta",
        // Match REPL prompts like 'user=>', '=>', or '#_=>', with optional whitespace
        begin: /^([\w.-]+|\s*#_)?=>/,
        starts: {
          end: /$/,
          subLanguage: "clojure" // Highlight the rest of the line as Clojure code
        }
      }
    ]
  };
}

module.exports = getClojureReplSyntaxDefinition;