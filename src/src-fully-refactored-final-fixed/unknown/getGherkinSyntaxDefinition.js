/**
 * Returns the syntax highlighting definition for the Gherkin language.
 *
 * @param {object} highlightJsInstance - An instance of the highlight.js library, providing built-in modes.
 * @returns {object} The syntax definition object for Gherkin, suitable for highlight.js registration.
 */
function getGherkinSyntaxDefinition(highlightJsInstance) {
  return {
    name: "Gherkin",
    aliases: ["feature"],
    keywords: "Feature Background Ability Business Need Scenario Scenarios Scenario Outline Scenario Template Examples Given And Then But When",
    contains: [
      {
        className: "symbol",
        begin: "\\*",
        relevance: 0 // Lower relevance to avoid false positives
      },
      {
        className: "meta",
        begin: "@[^@\\s]+" // Matches tags like @tag
      },
      {
        // Matches table rows, e.g. | value | value |
        begin: "\\|",
        end: "\\|\\w*$",
        contains: [
          {
            className: "string",
            begin: "[^|]+" // Table cell content
          }
        ]
      },
      {
        className: "variable",
        begin: "<",
        end: ">" // Matches variables like <variable>
      },
      highlightJsInstance.HASH_COMMENT_MODE, // Support for comments starting with '#'
      {
        className: "string",
        begin: '"""',
        end: '"""' // Multiline string support
      },
      highlightJsInstance.QUOTE_STRING_MODE // Standard quoted string support
    ]
  };
}

module.exports = getGherkinSyntaxDefinition;