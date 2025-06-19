/**
 * Factory function that creates a syntax highlighting definition for ERB (Embedded Ruby) templates.
 * This definition is intended for use with syntax highlighters such as highlight.js.
 * It defines how ERB tags and comments should be recognized and highlighted, leveraging XML as the base language
 * and embedding Ruby code within ERB delimiters.
 *
 * @param {object} syntaxHelpers - An object providing helper functions for defining syntax highlighting rules.
 *                                 Must include a COMMENT(begin, end) function for comment detection.
 * @returns {object} Syntax highlighting definition for ERB templates, suitable for use in a highlighting engine.
 */
function createErbHighlightingDefinition(syntaxHelpers) {
  return {
    name: "ERB",
    subLanguage: "xml", // Use XML as the base language for highlighting
    contains: [
      // ERB comment: <%# ... %>
      syntaxHelpers.COMMENT("<%#", "%>"),
      {
        // ERB code block: <% ... %>, <%= ... %>, <%- ... %>, etc.
        begin: "<%[%=-]?", // Match opening ERB tag with optional %, =, or -
        end: "[%-]?%>",   // Match closing ERB tag with optional -
        subLanguage: "ruby", // Highlight the content inside as Ruby
        excludeBegin: true,   // normalizeToError not include the opening tag in the Ruby highlighting
        excludeEnd: true      // normalizeToError not include the closing tag in the Ruby highlighting
      }
    ]
  };
}

module.exports = createErbHighlightingDefinition;