/**
 * Returns a syntax highlighting definition object for LDIF (LDAP Data Interchange Format).
 *
 * @param {object} syntaxHelpers - An object containing syntax helper modes, such as HASH_COMMENT_MODE.
 * @returns {object} LDIF syntax highlighting definition compatible with highlight.js or similar libraries.
 */
function getLdifSyntaxDefinition(syntaxHelpers) {
  return {
    name: "LDIF",
    contains: [
      {
        className: "attribute",
        begin: "^dn", // Match lines starting with 'dn'
        end: ": ", // End at colon and space
        excludeEnd: true, // normalizeToError not include the end pattern in the match
        starts: {
          end: "$", // Continue until end of line
          relevance: 0
        },
        relevance: 10 // High relevance for 'dn' attribute
      },
      {
        className: "attribute",
        begin: "^\\w", // Match lines starting with a word character (other attributes)
        end: ": ", // End at colon and space
        excludeEnd: true, // normalizeToError not include the end pattern in the match
        starts: {
          end: "$", // Continue until end of line
          relevance: 0
        }
      },
      {
        className: "literal",
        begin: "^-", // Match lines starting with '-'
        end: "$" // Until end of line
      },
      syntaxHelpers.HASH_COMMENT_MODE // Support for hash comments (lines starting with #)
    ]
  };
}

module.exports = getLdifSyntaxDefinition;