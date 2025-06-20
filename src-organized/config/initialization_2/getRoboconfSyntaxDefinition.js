/**
 * Returns a syntax highlighting definition object for the Roboconf DSL.
 *
 * @param {object} highlightJsApi - The highlight.js API object, expected to provide HASH_COMMENT_MODE for comment parsing.
 * @returns {object} Syntax definition for Roboconf, suitable for highlight.js registration.
 */
function getRoboconfSyntaxDefinition(highlightJsApi) {
  // Attribute definition: matches attribute names followed by a colon
  const attributeDefinition = {
    className: "attribute",
    begin: /[a-zA-_]+/, // Matches attribute names (letters, dash, underscore)
    end: /\\s*:/,          // Ends at colon (with optional whitespace)
    excludeEnd: true,     // Exclude the colon from the matched text
    starts: {
      end: ";",          // Attribute value ends at semicolon
      relevance: 0,       // No extra relevance for this block
      contains: [
        {
          className: "variable",
          begin: /\.[a-zA-_]+/ // Matches variables starting with a dot
        },
        {
          className: "keyword",
          begin: /\(optional\)/   // Matches the literal string '(optional)'
        }
      ]
    }
  };

  return {
    name: "Roboconf",
    aliases: ["graph", "instances"],
    case_insensitive: true,
    keywords: "import",
    contains: [
      // Facet block definition
      {
        begin: "^facet [a-zA-_][^\n{]+\{", // Matches 'facet' blocks
        end: /\}/,
        keywords: "facet",
        contains: [attributeDefinition, highlightJsApi.HASH_COMMENT_MODE]
      },
      // Instance block definition
      {
        begin: "^\s*instance of [a-zA-_][^\n{]+\{", // Matches 'instance of' blocks
        end: /\}/,
        keywords: "name count channels instance-data instance-state instance of",
        illegal: /\s/, // Illegal to have non-whitespace before 'instance of'
        contains: ["self", attributeDefinition, highlightJsApi.HASH_COMMENT_MODE]
      },
      // Generic block definition
      {
        begin: "^[a-zA-_][^\n{]+\{", // Matches any block starting with a valid identifier
        end: /\}/,
        contains: [attributeDefinition, highlightJsApi.HASH_COMMENT_MODE]
      },
      // Hash comments
      highlightJsApi.HASH_COMMENT_MODE
    ]
  };
}

module.exports = getRoboconfSyntaxDefinition;