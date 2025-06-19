/**
 * Defines syntax highlighting rules for the Roboconf language.
 *
 * @param {object} highlightJsApi - The highlight.js API object, expected to provide HASH_COMMENT_MODE for comment parsing.
 * @returns {object} Highlight.js language definition for Roboconf.
 */
function defineRoboconfHighlighting(highlightJsApi) {
  // Attribute rule: matches attribute names followed by a colon
  const attributeRule = {
    className: "attribute",
    begin: /[a-zA-_]+/, // Attribute name
    end: /\\s*:/,          // Ends at colon (with optional whitespace)
    excludeEnd: true,      // Exclude the colon from the match
    starts: {
      end: ";",           // Attribute value ends at semicolon
      relevance: 0,        // No extra relevance for attribute values
      contains: [
        {
          className: "variable",
          begin: /\.[a-zA-_]+/ // Variable: dot followed by identifier
        },
        {
          className: "keyword",
          begin: /\(optional\)/ // The literal string '(optional)'
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
      // Facet block: e.g. 'facet my-facet {' ... '}'
      {
        begin: "^facet [a-zA-_][^\n{]+\{",
        end: /\}/,
        keywords: "facet",
        contains: [attributeRule, highlightJsApi.HASH_COMMENT_MODE]
      },
      // Instance block: e.g. 'instance of MyType {' ... '}'
      {
        begin: "^\s*instance of [a-zA-_][^\n{]+\{",
        end: /\}/,
        keywords: "name count channels instance-data instance-state instance of",
        illegal: /\s/, // Disallow non-whitespace before 'instance of'
        contains: ["self", attributeRule, highlightJsApi.HASH_COMMENT_MODE]
      },
      // Generic block: e.g. 'my-type {' ... '}'
      {
        begin: "^[a-zA-_][^\n{]+\{",
        end: /\}/,
        contains: [attributeRule, highlightJsApi.HASH_COMMENT_MODE]
      },
      // Comments
      highlightJsApi.HASH_COMMENT_MODE
    ]
  };
}

module.exports = defineRoboconfHighlighting;