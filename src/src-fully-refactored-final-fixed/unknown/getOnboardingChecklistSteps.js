/**
 * Returns an array of onboarding checklist step objects for the Claude app workspace.
 * Each step contains metadata for UI rendering and completion status.
 *
 * @returns {Array<Object>} Array of checklist step objects for onboarding UI
 */
function getOnboardingChecklistSteps() {
  // Check if CLAUDE.md file exists in the workspace
  const isClaudeMdPresent = getBm9Value().existsSync(createIterableHelper$6(iA(), "CLAUDE.md"));

  // Determine if the workspace is enabled (e.g., ready for onboarding)
  const isWorkspaceEnabled = OxA(iA());

  // Get theme styles for consistent UI coloring
  const themeStyles = getThemeStylesheet().secondaryText;

  // Get configuration for terminal integration status
  const config = getCachedOrFreshConfig();

  return [
    {
      key: "workspace",
      text: d8.createElement(_, {
        color: themeStyles
      }, "Ask Claude to create a new app or clone a repository"),
      isComplete: false,
      isCompletable: true,
      isEnabled: isWorkspaceEnabled
    },
    {
      key: "claudemd",
      text: d8.createElement(_, {
        color: themeStyles
      }, "Run /init to create a CLAUDE.md file with instructions for Claude"),
      isComplete: isClaudeMdPresent,
      isCompletable: true,
      isEnabled: !isWorkspaceEnabled
    },
    {
      key: "terminal",
      text: d8.createElement(_, {
        color: themeStyles
      }, "Run /terminal-setup to set up terminal integration"),
      // Mark as complete if either terminal integration key binding is installed
      isComplete: Boolean(config.shiftEnterKeyBindingInstalled || config.optionAsMetaKeyInstalled),
      isCompletable: true,
      isEnabled: Uw.isEnabled()
    },
    {
      key: "questions",
      text: d8.createElement(_, {
        color: themeStyles
      }, "Use Claude to help with file analysis, editing, bash commands and git"),
      isComplete: false,
      isCompletable: false,
      isEnabled: true
    },
    {
      key: "changes",
      text: d8.createElement(_, {
        color: themeStyles
      }, "Be as specific as you would with another engineer for the best results"),
      isComplete: false,
      isCompletable: false,
      isEnabled: true
    }
  ];
}

module.exports = getOnboardingChecklistSteps;