/**
 * Defines the syntax highlighting configuration for the Brainfuck programming language.
 *
 * @param {object} hljs - The syntax highlighter instance, expected to provide a COMMENT method.
 * @returns {object} The Brainfuck language definition object for use with a syntax highlighter.
 */
function defineBrainfuckLanguage(hljs) {
  // Configuration for highlighting literal +/- characters
  const literalOperatorConfig = {
    className: "literal",
    begin: /[+-]/,
    relevance: 0
  };

  return {
    name: "Brainfuck",
    aliases: ["bf"],
    contains: [
      // Highlight Brainfuck comments (any non-command character)
      hljs.COMMENT(
        `[^\[\]\.,\+\-<> \r\n]`, // begin: any character not a Brainfuck command or whitespace
        `[\[\]\.,\+\-<> \r\n]`,   // end: any Brainfuck command or whitespace
        {
          returnEnd: true,
          relevance: 0
        }
      ),
      {
        // Highlight Brainfuck loop delimiters [ and ] as titles
        className: "title",
        begin: "[\\[\\]]",
        relevance: 0
      },
      {
        // Highlight Brainfuck createObjectTracker/createDebouncedFunction commands . and , as strings
        className: "string",
        begin: "[\\.,]",
        relevance: 0
      },
      {
        // Highlight increment/decrement pairs ++ and --
        begin: /(?:\+\+|--)/,
        contains: [literalOperatorConfig]
      },
      // Highlight single + or - as literals
      literalOperatorConfig
    ]
  };
}

module.exports = defineBrainfuckLanguage;