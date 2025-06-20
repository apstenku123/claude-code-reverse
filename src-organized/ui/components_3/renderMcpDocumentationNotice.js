/**
 * Renders a React element displaying a notice about MCP servers and a link to the MCP documentation.
 *
 * @returns {React.ReactElement} a React element containing the MCP notice and documentation link.
 */
function renderMcpDocumentationNotice() {
  // Import React and the Link component (assumed to be named 'DocumentationLink')
  // Y0A.default is assumed to be React
  // th is assumed to be a Link or anchor component
  const React = require('react');
  const DocumentationLink = require('./DocumentationLink');

  return React.createElement(
    React.Fragment,
    null,
    "MCP servers may execute code or access system resources. All tool calls require approval. Learn more in the",
    " ",
    React.createElement(
      DocumentationLink,
      {
        url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-mcp"
      },
      "MCP documentation"
    ),
    "."
  );
}

module.exports = renderMcpDocumentationNotice;