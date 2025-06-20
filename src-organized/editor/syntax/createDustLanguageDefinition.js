/**
 * Returns a language definition object for the Dust templating language, suitable for syntax highlighting engines.
 *
 * @param {object} syntaxHelpers - An object containing syntax helper definitions, such as QUOTE_STRING_MODE.
 * @returns {object} The Dust language definition object for use in syntax highlighters.
 */
function createDustLanguageDefinition(syntaxHelpers) {
  return {
    name: "Dust",
    aliases: ["dst"],
    case_insensitive: true, // Dust tags are case-insensitive
    subLanguage: "xml", // Dust templates are embedded in XML/HTML
    contains: [
      {
        className: "template-tag",
        begin: /\{[#\/]/, // Matches opening of Dust block tags: {#, {/ or {/
        end: /\}/, // Matches closing curly brace
        illegal: /;/, // Semicolons are not allowed inside Dust tags
        contains: [
          {
            className: "name",
            begin: /[a-zA\.-]+/, // Matches tag names (letters, dot, dash)
            starts: {
              endsWithParent: true, // Continue until parent ends
              relevance: 0, // No extra relevance for tag names
              contains: [syntaxHelpers.QUOTE_STRING_MODE] // Allow quoted strings inside tags
            }
          }
        ]
      },
      {
        className: "template-variable",
        begin: /\{/, // Matches opening curly brace for variables
        end: /\}/, // Matches closing curly brace
        illegal: /;/, // Semicolons are not allowed inside variables
        keywords: "if eq extractRelevantInteractionId lt lte gt gte select default math sep" // Dust keywords for logic blocks
      }
    ]
  };
}

module.exports = createDustLanguageDefinition;