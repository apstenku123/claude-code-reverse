/**
 * Defines the syntax highlighting rules for the Roboconf language.
 *
 * @param {object} highlightJsApi - The highlight.js API object, which provides built-in modes and utilities.
 * @returns {object} The language definition object for Roboconf, suitable for highlight.js registration.
 */
function defineRoboconfSyntax(highlightJsApi) {
  // Attribute rule: matches attribute names followed by a colon
  const attributeRule = {
    className: "attribute",
    begin: /[a-zA-_]+/, // Attribute name
    end: /\\s*:/,          // Ends at colon (with optional whitespace)
    excludeEnd: true,      // normalizeToError not include the colon in the match
    starts: {
      end: ";",           // Attribute value ends at semicolon
      relevance: 0,        // No extra relevance for this part
      contains: [
        {
          className: "variable",
          begin: /\.[a-zA-_]+/ // Matches variables starting with a dot
        },
        {
          className: "keyword",
          begin: /\(optional\)/  // Matches the literal '(optional)'
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
      // Facet block: e.g., 'facet something {' ... '}'
      {
        begin: "^facet [a-zA-_][^\n{]+\{",
        end: /\}/,
        keywords: "facet",
        contains: [attributeRule, highlightJsApi.HASH_COMMENT_MODE]
      },
      // Instance block: e.g., 'instance of something {' ... '}'
      {
        begin: "^\s*instance of [a-zA-_][^\n{]+\{",
        end: /\}/,
        keywords: "name count channels instance-data instance-state instance of",
        illegal: /\s/, // Illegal non-whitespace at the start
        contains: ["self", attributeRule, highlightJsApi.HASH_COMMENT_MODE]
      },
      // Generic block: e.g., 'something {' ... '}'
      {
        begin: "^[a-zA-_][^\n{]+\{",
        end: /\}/,
        contains: [attributeRule, highlightJsApi.HASH_COMMENT_MODE]
      },
      // Hash comments (e.g., '# comment')
      highlightJsApi.HASH_COMMENT_MODE
    ]
  };
}

module.exports = defineRoboconfSyntax;