/**
 * Renders a warning message about MCP servers, including a link to the documentation.
 *
 * @returns {React.ReactElement} a React element containing the warning message and documentation link.
 */
function renderMcpWarningMessage() {
  // Import React and the Link component for documentation
  const React = require('react');
  const DocumentationLink = require('./DocumentationLink'); // Assumes 'th' is a link component

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

module.exports = renderMcpWarningMessage;