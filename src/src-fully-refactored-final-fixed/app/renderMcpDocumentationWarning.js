/**
 * Renders a warning message about MCP server permissions with a link to the documentation.
 *
 * @returns {React.ReactElement} a React element containing the warning message and documentation link.
 */
function renderMcpDocumentationWarning() {
  // Import React and the Link component from their respective modules
  const React = require('react');
  const DocumentationLink = require('./DocumentationLink'); // Assumed component for links

  return React.createElement(
    React.Fragment,
    null,
    "MCP servers may execute code or access system resources. All tool calls require approval. Learn more in the",
    " ",
    React.createElement(
      DocumentationLink,
      { url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-mcp" },
      "MCP documentation"
    ),
    "."
  );
}

module.exports = renderMcpDocumentationWarning;