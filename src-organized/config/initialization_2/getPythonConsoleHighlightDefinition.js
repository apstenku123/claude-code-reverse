/**
 * Returns a syntax highlighting definition for Python console (pycon) code blocks.
 * This definition is typically used by syntax highlighters to recognize and style Python REPL prompts and code.
 *
 * @returns {Object} Highlight.js language definition for Python console code blocks.
 */
function getPythonConsoleHighlightDefinition() {
  return {
    // Alias for this language definition
    aliases: ["pycon"],
    contains: [
      {
        className: "meta", // Highlight REPL prompts as meta information
        starts: {
          end: / |$/, // End at space or end of line
          starts: {
            end: "$", // End at end of line
            subLanguage: "python" // Highlight the rest as Python code
          }
        },
        variants: [
          {
            begin: /^>>>(?=[ ]|$)/ // Match Python primary prompt (>>>), followed by space or end of line
          },
          {
            begin: /^\.\.\.(?=[ ]|$)/ // Match Python secondary prompt (...), followed by space or end of line
          }
        ]
      }
    ]
  };
}

module.exports = getPythonConsoleHighlightDefinition;