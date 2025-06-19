/**
 * Renders a status hint or message for the shell UI based on the current mode, permissions, and running shells.
 *
 * @param {Object} options - Options for rendering the shell status hint.
 * @param {string} options.mode - The current mode (e.g., 'memory', 'bash').
 * @param {Object} options.toolPermissionContext - Context object containing tool permission information (may include a 'mode' property).
 * @param {boolean} options.showHint - Whether to show the hint or not.
 * @param {boolean} [options.shellsSelected=false] - Whether shells are currently selected.
 * @returns {React.ReactNode|null} The rendered React element for the shell status hint, or null if no hint should be shown.
 */
function renderShellStatusHint({
  mode,
  toolPermissionContext,
  showHint,
  shellsSelected = false
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  // Get the list of shells from the shell context
  const { shells } = useShellsState();

  // Count the number of running shells
  const runningShellCount = shells.filter(shell => shell.status === "running").length;

  // Show memory mode hint
  if (mode === "memory") {
    return d4.createElement(_,
      { color: theme.remember },
      "# to memorize"
    );
  }

  // Show bash mode hint
  if (mode === "bash") {
    return d4.createElement(_,
      { color: theme.bashBorder },
      "! for bash mode"
    );
  }

  // Show plan mode hint if toolPermissionContext is in 'plan' mode
  if (toolPermissionContext?.mode === "plan") {
    return d4.createElement(_,
      { color: theme.planMode, key: "plan-mode" },
      "⏸ plan mode on",
      d4.createElement(_,
        { color: theme.secondaryText, dimColor: true },
        " ",
        "(shift+tab to cycle)"
      )
    );
  }

  // Show auto-accept edits mode hint if toolPermissionContext is in 'acceptEdits' mode
  if (toolPermissionContext?.mode === "acceptEdits") {
    return d4.createElement(_,
      { color: theme.autoAccept, key: "write-file-allowed" },
      "⏵⏵ auto-accept edits on",
      d4.createElement(_,
        { color: theme.secondaryText, dimColor: true },
        " ",
        "(shift+tab to cycle)"
      )
    );
  }

  // Show running shells status if any shells are running
  if (runningShellCount > 0) {
    // Check if the user has seen the tasks hint before
    const hasSeenTasksHint = getCachedOrFreshConfig().hasSeenTasksHint;

    return d4.createElement(g, { gap: 1 },
      d4.createElement(_,
        {
          color: shellsSelected ? "white" : theme.permission,
          inverse: shellsSelected,
          bold: shellsSelected
        },
        shellsSelected ? " " : "",
        runningShellCount,
        " ",
        runningShellCount === 1 ? "bash" : "bashes",
        " running",
        shellsSelected ? " " : ""
      ),
      showHint && d4.createElement(d4.Fragment, null,
        d4.createElement(_, { dimColor: true }, "·"),
        d4.createElement(_, { dimColor: true },
          shellsSelected ? "Enter to view shells" : !hasSeenTasksHint ? "↓ to view" : "? for shortcuts"
        )
      )
    );
  }

  // If showHint is false, render nothing
  if (!showHint) {
    return null;
  }

  // Default hint when nothing else applies
  return d4.createElement(_,
    { dimColor: true },
    "? for shortcuts"
  );
}

module.exports = renderShellStatusHint;