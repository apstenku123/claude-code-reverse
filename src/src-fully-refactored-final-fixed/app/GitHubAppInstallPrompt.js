/**
 * Displays a prompt guiding the user to install the Claude GitHub App for a specific repository.
 * Handles the UI and listens for the user'createInteractionAccessor completion action.
 *
 * @param {Object} params - The parameters for the prompt.
 * @param {string} params.repoUrl - The URL of the repository for which the app should be installed.
 * @param {Function} params.onSubmit - Callback invoked when the user completes the installation (presses Enter).
 * @returns {React.ReactElement} The rendered React element for the install prompt UI.
 */
function GitHubAppInstallPrompt({ repoUrl, onSubmit }) {
  // Register a handler to listen for the 'return' (Enter) key event
  D0((event, observer) => {
    if (observer.return) {
      onSubmit();
    }
  });

  // Retrieve theme styles for consistent UI appearance
  const themeStyles = getThemeStylesheet();

  // Render the prompt UI using the NW.default (React) and custom components
  return NW.default.createElement(
    g,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: themeStyles.secondaryBorder,
      paddingX: 1
    },
    // Header section
    NW.default.createElement(
      g,
      { flexDirection: "column", marginBottom: 1 },
      NW.default.createElement(_, { bold: true }, "Install GitHub App"),
      NW.default.createElement(_, { dimColor: true }, "Install the Claude GitHub App")
    ),
    // Inform user that browser is opening
    NW.default.createElement(
      g,
      { marginBottom: 1 },
      NW.default.createElement(_, null, "Opening browser to install the Claude GitHub App…")
    ),
    // Show which repository the app should be installed for
    NW.default.createElement(
      g,
      { marginBottom: 1 },
      NW.default.createElement(
        _,
        null,
        "Please install the app for repository: ",
        NW.default.createElement(_, { bold: true }, repoUrl)
      )
    ),
    // Important note about granting access
    NW.default.createElement(
      g,
      { marginBottom: 1 },
      NW.default.createElement(_, { dimColor: true }, "Important: Make sure to grant access to this specific repository")
    ),
    // Final instruction to press Enter
    NW.default.createElement(
      g,
      null,
      NW.default.createElement(
        _,
        { bold: true, color: themeStyles.permission },
        "Press Enter once you'removeTrailingCharacters installed the app",
        y0.ellipsis
      )
    )
  );
}

module.exports = GitHubAppInstallPrompt;