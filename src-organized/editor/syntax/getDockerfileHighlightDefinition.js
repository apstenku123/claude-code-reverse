/**
 * Returns the syntax highlighting definition for Dockerfile language.
 *
 * @param {object} highlightHelpers - An object containing common highlight.js modes (e.g., comment, string, number modes).
 * @returns {object} The Dockerfile language definition for syntax highlighting.
 */
function getDockerfileHighlightDefinition(highlightHelpers) {
  return {
    // Name of the language
    name: "Dockerfile",

    // Alternative names for the language
    aliases: ["docker"],

    // Dockerfile keywords are case-insensitive
    case_insensitive: true,

    // List of keywords for highlighting
    keywords: "from maintainer expose env arg user onbuild stopsignal",

    // Highlighting rules for Dockerfile
    contains: [
      // Hash comments (e.g., # comment)
      highlightHelpers.HASH_COMMENT_MODE,

      // Single-quoted strings
      highlightHelpers.APOS_STRING_MODE,

      // Double-quoted strings
      highlightHelpers.QUOTE_STRING_MODE,

      // Numbers
      highlightHelpers.NUMBER_MODE,

      // Special handling for instructions that start shell commands
      {
        // Match lines starting with these keywords
        beginKeywords: "run cmd entrypoint volume add copy workdir label healthcheck shell",
        starts: {
          // The shell command continues until a non-escaped end-of-line
          end: /[^\\]$/,
          // Use Bash syntax highlighting for the shell command
          subLanguage: "bash"
        }
      }
    ],

    // Illegal pattern to prevent highlighting HTML tags
    illegal: "</"
  };
}

module.exports = getDockerfileHighlightDefinition;