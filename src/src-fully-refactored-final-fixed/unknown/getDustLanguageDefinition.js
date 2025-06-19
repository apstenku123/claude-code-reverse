/**
 * Returns the language definition object for the Dust templating language, suitable for syntax highlighting engines.
 *
 * @param {object} languageHelpers - An object containing helper modes and utilities for language definitions (e.g., QUOTE_STRING_MODE).
 * @returns {object} The Dust language definition object, including name, aliases, case sensitivity, sublanguage, and syntax highlighting rules.
 */
function getDustLanguageDefinition(languageHelpers) {
  return {
    name: "Dust",
    aliases: ["dst"],
    case_insensitive: true,
    subLanguage: "xml",
    contains: [
      {
        className: "template-tag",
        // Matches opening of Dust tags: {#, {/ or {/
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
              // Allows quoted strings inside tag names
              contains: [languageHelpers.QUOTE_STRING_MODE]
            }
          }
        ]
      },
      {
        className: "template-variable",
        // Matches any Dust variable: {...}
        begin: /\{/, 
        end: /\}/,
        illegal: /;/,
        // List of Dust keywords for highlighting
        keywords: "if eq extractRelevantInteractionId lt lte gt gte select default math sep"
      }
    ]
  };
}

module.exports = getDustLanguageDefinition;