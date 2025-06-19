/**
 * Returns a syntax highlighting definition object for LDIF (LDAP Data Interchange Format).
 * This object is typically used by syntax highlighters (e.g., highlight.js) to define how LDIF files should be parsed and highlighted.
 *
 * @param {object} syntaxHelpers - An object containing helper modes and definitions for syntax highlighting (e.g., HASH_COMMENT_MODE).
 * @returns {object} LDIF highlighting definition compatible with syntax highlighters.
 */
function getLdifHighlightingDefinition(syntaxHelpers) {
  return {
    name: "LDIF",
    contains: [
      {
        className: "attribute",
        begin: "^dn", // Match lines starting with 'dn'
        end: ": ", // End at the colon and space
        excludeEnd: true, // normalizeToError not include the end pattern in the match
        starts: {
          end: "$", // Continue until the end of the line
          relevance: 0 // No extra relevance for the value part
        },
        relevance: 10 // High relevance for 'dn' lines
      },
      {
        className: "attribute",
        begin: "^\\w", // Match lines starting with a word character (attribute names)
        end: ": ", // End at the colon and space
        excludeEnd: true, // normalizeToError not include the end pattern in the match
        starts: {
          end: "$", // Continue until the end of the line
          relevance: 0 // No extra relevance for the value part
        }
      },
      {
        className: "literal",
        begin: "^-", // Match lines starting with a dash (LDIF separator)
        end: "$" // Until the end of the line
      },
      syntaxHelpers.HASH_COMMENT_MODE // Support for hash comments (e.g., # comment)
    ]
  };
}

module.exports = getLdifHighlightingDefinition;