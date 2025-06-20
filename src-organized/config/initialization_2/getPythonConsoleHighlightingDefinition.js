/**
 * Returns a syntax highlighting definition for Python console (pycon) code blocks.
 * This definition is used by syntax highlighters (e.g., highlight.js) to recognize Python REPL prompts and code.
 *
 * @returns {object} Highlighting definition object for Python console code blocks
 */
function getPythonConsoleHighlightingDefinition() {
  return {
    // Alias for this language definition
    aliases: ["pycon"],
    // Contains the rules for matching Python REPL prompts and code
    contains: [
      {
        className: "meta", // Highlight REPL prompts as meta
        // Start matching at REPL prompt, then delegate to Python sublanguage
        starts: {
          end: / |$/, // End at a space or end of line
          starts: {
            end: "$", // End at end of line
            subLanguage: "python" // Parse the rest as Python code
          }
        },
        // Match either '>>>' or '...' at the start of a line, followed by space or end of line
        variants: [
          {
            begin: /^>>>(?=[ ]|$)/
          },
          {
            begin: /^\.\.\.(?=[ ]|$)/
          }
        ]
      }
    ]
  };
}

module.exports = getPythonConsoleHighlightingDefinition;