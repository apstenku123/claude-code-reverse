/**
 * Returns a syntax highlighting definition object for shell session code blocks.
 * This definition is intended for use with syntax highlighters such as highlight.js.
 * It matches shell prompts and applies Bash highlighting to the command portion.
 *
 * @returns {object} Syntax highlighting definition for shell sessions
 */
function getShellSessionHighlightDefinition() {
  return {
    name: "Shell Session", // Name of the language definition
    aliases: ["console"], // Alternative names for this language
    contains: [
      {
        className: "meta", // Highlight the prompt as meta information
        // Match up to 3 leading spaces, then a typical shell prompt (e.g., user@host:~$)
        begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
        starts: {
          // End the highlighting at the end of the line, unless the line ends with a backslash
          end: /[^\\](?=\s*$)/,
          subLanguage: "bash" // Highlight the command using Bash rules
        }
      }
    ]
  };
}

module.exports = getShellSessionHighlightDefinition;