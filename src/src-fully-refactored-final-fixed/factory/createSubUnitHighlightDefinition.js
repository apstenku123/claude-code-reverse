/**
 * Factory function that returns a highlight.js language definition object for SubUnit output format.
 * This definition is used to highlight SubUnit test output, recognizing strings, timestamps, numbers, and keywords.
 *
 * @param {object} highlightJsInstance - The highlight.js instance (not used directly, but included for compatibility with highlight.js language factory signature).
 * @returns {object} Highlight.js language definition for SubUnit output.
 */
function createSubUnitHighlightDefinition(highlightJsInstance) {
  return {
    name: "SubUnit",
    case_insensitive: true, // SubUnit keywords are case-insensitive
    contains: [
      {
        className: "string",
        // Matches lines starting with [ or [multipart]
        begin: "\\[(multipart)?",
        end: "\\]\n"
      },
      {
        className: "string",
        // Matches ISO 8601 timestamps with milliseconds and Zulu time
        begin: "\\d{4}-\\d{2}-\\d{2}(\\s+)\\d{2}:\\d{2}:\\d{2}.\\d+zA"
      },
      {
        className: "string",
        // Matches signed integers (e.g., +123, -456)
        begin: "(\\+|-)\\d+"
      },
      {
        className: "keyword",
        relevance: 10, // High relevance for these keywords
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
            // Matches tags line
            begin: "^tags:"
          },
          {
            // Matches time line
            begin: "^time:"
          }
        ]
      }
    ]
  };
}

module.exports = createSubUnitHighlightDefinition;