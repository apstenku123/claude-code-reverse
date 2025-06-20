/**
 * Returns a syntax highlighting definition object for the Dust templating language.
 *
 * @param {object} highlightHelpers - An object containing highlight.js mode helpers, such as QUOTE_STRING_MODE.
 * @returns {object} Highlight.js language definition for Dust templates.
 */
function createDustHighlightDefinition(highlightHelpers) {
  return {
    name: "Dust",
    aliases: ["dst"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      {
        className: "template-tag",
        // Matches Dust block tags like {#section}, {/section}
        begin: /\{[#\/]/,
        end: /\}/,
        illegal: /;/,
        contains: [
          {
            className: "name",
            // Matches tag names (letters, dots, hyphens)
            begin: /[a-zA\.-]+/,
            starts: {
              endsWithParent: true,
              relevance: 0,
              // Allow quoted strings inside tag names
              contains: [highlightHelpers.QUOTE_STRING_MODE]
            }
          }
        ]
      },
      {
        className: "template-variable",
        // Matches Dust variable tags like {variable}
        begin: /\{/, 
        end: /\}/,
        illegal: /;/,
        // List of keywords supported in Dust templates
        keywords: "if eq extractRelevantInteractionId lt lte gt gte select default math sep"
      }
    ]
  };
}

module.exports = createDustHighlightDefinition;