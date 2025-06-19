/**
 * Factory function that returns a syntax highlighting definition for Content Security Policy (CSP) headers.
 * This definition is intended for use with syntax highlighters such as highlight.js.
 *
 * @param {object} syntaxHighlighter - The syntax highlighter instance (not used in this implementation, but included for compatibility).
 * @returns {object} CSP syntax highlighting definition object.
 */
function createCspSyntaxDefinition(syntaxHighlighter) {
  return {
    name: "CSP", // Name of the language definition
    case_insensitive: false, // CSP is case-sensitive
    keywords: {
      // Pattern for valid CSP directive names
      $pattern: "[a-zA-Z][a-zA-Z0-9_-]*",
      // List of CSP directive keywords
      keyword: "base-uri child-src connect-src default-src font-src form-action frame-ancestors frame-src img-src media-src object-src plugin-types report-uri sandbox script-src style-src"
    },
    contains: [
      {
        className: "string",
        begin: "'", // Strings begin with a single quote
        end: "'"    // Strings end with a single quote
      },
      {
        className: "attribute",
        begin: "^Content", // Attribute names start with 'Content' at the beginning of the line
        end: ":",          // Attribute ends at the colon
        excludeEnd: true    // Exclude the colon from the matched attribute
      }
    ]
  };
}

module.exports = createCspSyntaxDefinition;
