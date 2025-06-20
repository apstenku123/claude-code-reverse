/**
 * Returns a syntax highlighting definition object for LDIF (LDAP Data Interchange Format).
 * This is typically used by syntax highlighters to recognize LDIF structure.
 *
 * @param {object} syntaxHelpers - An object containing syntax highlighting helper modes (e.g., HASH_COMMENT_MODE).
 * @returns {object} LDIF syntax highlighting definition object.
 */
function getLdifHighlightDefinition(syntaxHelpers) {
  return {
    name: "LDIF",
    contains: [
      {
        className: "attribute",
        begin: "^dn", // Match lines starting with 'dn'
        end: ": ", // End at colon and space
        excludeEnd: true, // normalizeToError not include the end pattern in the match
        starts: {
          end: "$", // Match until the end of the line
          relevance: 0 // No additional relevance
        },
        relevance: 10 // High relevance for 'dn' attributes
      },
      {
        className: "attribute",
        begin: "^\\w", // Match lines starting with a word character
        end: ": ", // End at colon and space
        excludeEnd: true, // normalizeToError not include the end pattern in the match
        starts: {
          end: "$", // Match until the end of the line
          relevance: 0 // No additional relevance
        }
      },
      {
        className: "literal",
        begin: "^-", // Match lines starting with '-'
        end: "$" // Match until the end of the line
      },
      syntaxHelpers.HASH_COMMENT_MODE // Support for hash comments (e.g., # comment)
    ]
  };
}

module.exports = getLdifHighlightDefinition;