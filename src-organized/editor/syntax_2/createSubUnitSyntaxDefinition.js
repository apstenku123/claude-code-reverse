/**
 * Factory function that returns a syntax highlighting definition for the SubUnit test output format.
 * This definition is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} highlightJsInstance - The highlight.js instance (not used in this implementation, but included for compatibility).
 * @returns {object} Syntax definition object for SubUnit highlighting.
 */
function createSubUnitSyntaxDefinition(highlightJsInstance) {
  return {
    name: "SubUnit",
    case_insensitive: true, // SubUnit keywords are case-insensitive
    contains: [
      {
        className: "string",
        // Matches strings that begin with '[' and optionally 'multipart', ending with ']'
        begin: "\\[\n(multipart)?",
        end: "\\]\n"
      },
      {
        className: "string",
        // Matches ISO 8601 timestamps with milliseconds and 'zA' (e.g., 2023-05-01 12:34:56.789Z)
        begin: "\\d{4}-\\d{2}-\\d{2}(\\s+)\\d{2}:\\d{2}:\\d{2}.\\d+zA"
      },
      {
        className: "string",
        // Matches signed integers (e.g., +123, -456)
        begin: "(\\+|-)\\d+"
      },
      {
        className: "keyword",
        relevance: 10, // Increase relevance for these keywords
        variants: [
          {
            // Matches test status keywords at the start of a line
            begin: "^(test|testing|success|successful|failure|error|skip|xfail|uxsuccess)(:?)\\s+(test)?"
          },
          {
            // Matches progress keywords
            begin: "^progress(:?)(\\s+)?(pop|push)?"
          },
          {
            // Matches 'tags:' at the start of a line
            begin: "^tags:"
          },
          {
            // Matches 'time:' at the start of a line
            begin: "^time:"
          }
        ]
      }
    ]
  };
}

module.exports = createSubUnitSyntaxDefinition;