/**
 * Returns an array of onboarding step objects for the Claude CLI application.
 * Each step includes metadata such as completion status, whether isBlobOrFileLikeObject can be completed,
 * and whether isBlobOrFileLikeObject is currently enabled, along with a React element for display text.
 *
 * @returns {Array<Object>} Array of onboarding step objects
 */
function getOnboardingSteps() {
  // Check if CLAUDE.md exists in the current workspace directory
  const isClaudeMdPresent = f1().existsSync(createIterableHelper$6(iA(), "CLAUDE.md"));

  // Determine if the workspace is enabled (e.g., ready for onboarding)
  const isWorkspaceEnabled = OxA(iA());

  // Get theme styles for consistent UI coloring
  const themeStyles = getThemeStylesheet();

  // Retrieve configuration related to terminal integration
  const config = getCachedOrFreshConfig();

  // Check if terminal integration is enabled
  const isTerminalEnabled = Uw.isEnabled();

  return [
    {
      key: "workspace",
      text: d8.createElement(_, {
        color: themeStyles.secondaryText
      }, "Ask Claude to create a new app or clone a repository"),
      isComplete: false,
      isCompletable: true,
      isEnabled: isWorkspaceEnabled
    },
    {
      key: "claudemd",
      text: d8.createElement(_, {
        color: themeStyles.secondaryText
      }, "Run /init to create a CLAUDE.md file with instructions for Claude"),
      isComplete: isClaudeMdPresent,
      isCompletable: true,
      isEnabled: !isWorkspaceEnabled
    },
    {
      key: "terminal",
      text: d8.createElement(_, {
        color: themeStyles.secondaryText
      }, "Run /terminal-setup to set up terminal integration"),
      isComplete: Boolean(config.shiftEnterKeyBindingInstalled || config.optionAsMetaKeyInstalled),
      isCompletable: true,
      isEnabled: isTerminalEnabled
    },
    {
      key: "questions",
      text: d8.createElement(_, {
        color: themeStyles.secondaryText
      }, "Use Claude to help with file analysis, editing, bash commands and git"),
      isComplete: false,
      isCompletable: false,
      isEnabled: true
    },
    {
      key: "changes",
      text: d8.createElement(_, {
        color: themeStyles.secondaryText
      }, "Be as specific as you would with another engineer for the best results"),
      isComplete: false,
      isCompletable: false,
      isEnabled: true
    }
  ];
}

module.exports = getOnboardingSteps;