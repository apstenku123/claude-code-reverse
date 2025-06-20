/**
 * Factory function that returns a highlight.js language definition for Content Security Policy (CSP) headers.
 * This definition specifies how CSP headers and their values should be highlighted.
 *
 * @param {object} hljsInstance - The highlight.js instance (not used in this definition, but required by highlight.js API).
 * @returns {object} Highlight.js language definition for CSP headers.
 */
function createCspHighlightDefinition(hljsInstance) {
  return {
    name: "CSP",
    case_insensitive: false, // CSP is case-sensitive
    keywords: {
      // Pattern for valid CSP directive names
      $pattern: "[a-zA-Z][a-zA-Z0-9_-]*",
      // List of common CSP directives
      keyword: "base-uri child-src connect-src default-src font-src form-action frame-ancestors frame-src img-src media-src object-src plugin-types report-uri sandbox script-src style-src"
    },
    contains: [
      {
        className: "string",
        begin: "'",
        end: "'"
      },
      {
        className: "attribute",
        begin: "^Content", // Matches headers starting with 'Content'
        end: ":",          // Ends at the colon
        excludeEnd: true    // Exclude the colon from the match
      }
    ]
  };
}

module.exports = createCspHighlightDefinition;
