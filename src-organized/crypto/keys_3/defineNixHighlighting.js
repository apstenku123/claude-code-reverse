/**
 * Defines syntax highlighting rules for the Nix language for a highlighting engine.
 *
 * @param {object} hljs - The highlighting engine instance providing common modes (e.g., NUMBER_MODE, HASH_COMMENT_MODE).
 * @returns {object} Highlighting definition for Nix, including keywords, string handling, comments, and attribute assignments.
 */
function defineNixHighlighting(hljs) {
  // Define Nix language keywords, literals, and built-in functions
  const nixKeywords = {
    keyword: "rec with let in inherit assert if else then",
    literal: "true false or and null",
    built_in: "import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation"
  };

  // Define interpolation/substitution within strings: ${ ... }
  const substitution = {
    className: "subst",
    begin: /\$\{/, // Start of interpolation
    end: /\}/,      // End of interpolation
    keywords: nixKeywords
  };

  // Define attribute assignment (e.g., attrName = ...)
  const attributeAssignment = {
    begin: /[a-zA-Z0-9-_]+(\s*=)/,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: /\\s+/
      }
    ]
  };

  // Define string variants (single and double quoted), supporting interpolation
  const nixString = {
    className: "string",
    contains: [substitution],
    variants: [
      {
        begin: "''",
        end: "''"
      },
      {
        begin: '"',
        end: '"'
      }
    ]
  };

  // List of all syntax elements to be highlighted
  const nixContains = [
    hljs.NUMBER_MODE,           // Numbers
    hljs.HASH_COMMENT_MODE,     // Single-line comments
    hljs.C_BLOCK_COMMENT_MODE,  // Multi-line comments
    nixString,                  // Strings
    attributeAssignment         // Attribute assignments
  ];

  // Allow nested highlighting inside substitutions
  substitution.contains = nixContains;

  // Return the full Nix language highlighting definition
  return {
    name: "Nix",
    aliases: ["nixos"],
    keywords: nixKeywords,
    contains: nixContains
  };
}

module.exports = defineNixHighlighting;