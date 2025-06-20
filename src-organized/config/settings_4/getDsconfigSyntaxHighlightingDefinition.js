/**
 * Returns the syntax highlighting definition for dsconfig CLI commands.
 *
 * This function defines the keywords, patterns, and rules used to highlight
 * dsconfig command-line syntax, including commands, options, and strings.
 *
 * @param {object} syntaxHelpers - An object containing helper modes and utilities for syntax highlighting.
 *   Expected to include HASH_COMMENT_MODE for comment highlighting.
 * @returns {object} The syntax highlighting definition object for dsconfig commands.
 */
function getDsconfigSyntaxHighlightingDefinition(syntaxHelpers) {
  return {
    keywords: "dsconfig",
    contains: [
      // Highlight the main dsconfig command at the start of a line
      {
        className: "keyword",
        begin: "^dsconfig",
        end: /\\s/,
        excludeEnd: true,
        relevance: 10
      },
      // Highlight built-in subcommands like list-*, create-*, get-*, set-*, delete-*
      {
        className: "built_in",
        begin: /(list|create|get|set|delete)-(\w+)/,
        end: /\\s/,
        excludeEnd: true,
        illegal: "!@#$%^&*()",
        relevance: 10
      },
      // Highlight command-line options (e.g., --option)
      {
        className: "built_in",
        begin: /--(\w+)/,
        end: /\\s/,
        excludeEnd: true
      },
      // Highlight double-quoted strings
      {
        className: "string",
        begin: /"/,
        end: /"/
      },
      // Highlight single-quoted strings
      {
        className: "string",
        begin: /'/,
        end: /'/
      },
      // Highlight key:value pairs (e.g., key:value)
      {
        className: "string",
        begin: /[\w\-?]+:\w+/,
        end: /\\W/,
        relevance: 0
      },
      // Highlight words with optional hyphens (e.g., word, word-word)
      {
        className: "string",
        begin: /\\w+(\-\w+)*/,
        end: /(?=\W)/,
        relevance: 0
      },
      // Include hash comment mode from syntaxHelpers
      syntaxHelpers.HASH_COMMENT_MODE
    ]
  };
}

module.exports = getDsconfigSyntaxHighlightingDefinition;