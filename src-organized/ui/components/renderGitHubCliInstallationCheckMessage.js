/**
 * Renders a React element displaying a message indicating that the GitHub CLI installation is being checked.
 *
 * @returns {React.ReactElement} a React element with the installation check message.
 */
function renderGitHubCliInstallationCheckMessage() {
  // Import the React library from the default export of LT2
  // The underscore (_) is assumed to be a React component or fragment
  return LT2.default.createElement(
    _, // React component or fragment to wrap the message
    null, // No props are passed
    "Checking GitHub CLI installation…" // The message to display
  );
}

module.exports = renderGitHubCliInstallationCheckMessage;