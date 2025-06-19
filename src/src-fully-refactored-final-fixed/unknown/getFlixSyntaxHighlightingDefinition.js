/**
 * Returns the syntax highlighting definition for the Flix programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing common language modes.
 * @returns {object} The Flix language definition object for highlight.js.
 */
function getFlixSyntaxHighlightingDefinition(hljs) {
  // Single-quoted string pattern (with escape sequences)
  const singleQuotedString = {
    className: "string",
    begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
  };

  // Double-quoted string pattern
  const doubleQuotedString = {
    className: "string",
    variants: [
      {
        begin: '"',
        end: '"'
      }
    ]
  };

  // Function definition pattern
  const functionDefinition = {
    className: "function",
    beginKeywords: "def",
    end: /[:={\[\(\n;]/, // Ends at one of these characters
    excludeEnd: true, // Exclude the end character from the match
    contains: [
      {
        className: "title",
        relevance: 0,
        // Function name: must not start with a digit or certain punctuation
        begin: /[^0-9\n\processRuleBeginHandlers "'(),.`{}\[\]:;][^\n\processRuleBeginHandlers "'(),.`{}\[\]:;]+|[^0-9\n\processRuleBeginHandlers "'(),.`{}\[\]:;=]/
      }
    ]
  };

  return {
    name: "Flix",
    keywords: {
      literal: "true false",
      keyword: "case class def else enum if impl import in lat rel index let match namespace switch type yield with"
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE, // Single-line comments
      hljs.C_BLOCK_COMMENT_MODE, // Block comments
      singleQuotedString,
      doubleQuotedString,
      functionDefinition,
      hljs.C_NUMBER_MODE // Numeric literals
    ]
  };
}

module.exports = getFlixSyntaxHighlightingDefinition;