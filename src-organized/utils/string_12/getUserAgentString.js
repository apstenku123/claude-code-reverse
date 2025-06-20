/**
 * Returns the user agent string for the Claude CLI, including version and entrypoint information.
 *
 * @returns {string} The formatted user agent string for the Claude CLI.
 */
function getUserAgentString() {
  // Define metadata related to the Claude CLI package
  const claudeCliMetadata = {
    ISSUE_REPORT_URL: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_NAME: "@anthropic-ai/claude-code",
    DOCUMENTATION_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };

  // Retrieve the entrypoint from environment variables
  const entrypoint = process.env.CLAUDE_CODE_ENTRYPOINT;

  // Construct and return the user agent string
  return `claude-cli/${claudeCliMetadata.VERSION} (external, ${entrypoint})`;
}

module.exports = getUserAgentString;