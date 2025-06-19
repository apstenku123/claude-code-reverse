/**
 * Defines syntax highlighting rules for the Brainfuck programming language.
 *
 * @param {object} hljs - The syntax highlighting library instance, expected to provide a COMMENT method.
 * @returns {object} Highlight.js language definition object for Brainfuck.
 */
function defineBrainfuckHighlighting(hljs) {
  // Configuration for matching single + or - as a literal
  const literalConfig = {
    className: "literal",
    begin: /[+-]/,
    relevance: 0
  };

  return {
    name: "Brainfuck",
    aliases: ["bf"],
    contains: [
      // Comments: any character not part of Brainfuck syntax
      hljs.COMMENT(
        `[^\\[\\]\\.,\\+\\-<> \r\n]`, // begin: match any non-Brainfuck character
        `[\\[\\]\\.,\\+\\-<> \r\n]`, // end: match any Brainfuck character or whitespace
        {
          returnEnd: true,
          relevance: 0
        }
      ),
      // Title: matches [ or ]
      {
        className: "title",
        begin: "[\\[\\]]",
        relevance: 0
      },
      // String: matches . or ,
      {
        className: "string",
        begin: "[\\.,]",
        relevance: 0
      },
      // Match double increment/decrement (++, --) and highlight inner + or -
      {
        begin: /(?:\+\+|--)/,
        contains: [literalConfig]
      },
      // Match single + or - as literal
      literalConfig
    ]
  };
}

module.exports = defineBrainfuckHighlighting;