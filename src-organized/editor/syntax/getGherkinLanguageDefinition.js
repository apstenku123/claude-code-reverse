/**
 * Returns the syntax highlighting definition for the Gherkin language.
 *
 * @param {object} highlightJsInstance - An instance of the syntax highlighter, providing common modes (e.g., HASH_COMMENT_MODE, QUOTE_STRING_MODE).
 * @returns {object} Gherkin language definition object for syntax highlighting.
 */
function getGherkinLanguageDefinition(highlightJsInstance) {
  return {
    name: "Gherkin",
    aliases: ["feature"],
    keywords: "Feature Background Ability Business Need Scenario Scenarios Scenario Outline Scenario Template Examples Given And Then But When",
    contains: [
      // Matches asterisk symbols (e.g., for bullet points)
      {
        className: "symbol",
        begin: /\*/,
        relevance: 0
      },
      // Matches tags (e.g., @wip, @smoke)
      {
        className: "meta",
        begin: /@[^@\s]+/
      },
      // Matches table rows (e.g., | value | value |)
      {
        begin: /\|/,
        end: /\|\w*$/,
        contains: [
          {
            className: "string",
            begin: /[^|]+/
          }
        ]
      },
      // Matches variables (e.g., <variable>)
      {
        className: "variable",
        begin: /</,
        end: />/
      },
      // Matches comments using the highlighter'createInteractionAccessor built-in hash comment mode
      highlightJsInstance.HASH_COMMENT_MODE,
      // Matches multi-line strings (""" ... """)
      {
        className: "string",
        begin: /"""/,
        end: /"""/
      },
      // Matches quoted strings using the highlighter'createInteractionAccessor built-in quote string mode
      highlightJsInstance.QUOTE_STRING_MODE
    ]
  };
}

module.exports = getGherkinLanguageDefinition;