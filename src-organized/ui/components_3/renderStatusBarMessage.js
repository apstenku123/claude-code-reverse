/**
 * Renders the appropriate status bar message or notification for the CLI UI.
 *
 * Depending on the current UI state (exit message, pasting, notification, Vim mode, etc.),
 * this function returns the correct React element to display in the status bar.
 *
 * @param {Object} params - The parameters for rendering the status bar message.
 * @param {Object} params.exitMessage - The exit message state. { show: boolean, key: string }
 * @param {string} params.vimMode - The current Vim mode (e.g., 'INSERT', 'NORMAL').
 * @param {string} params.mode - The current application mode.
 * @param {Object} params.notification - The notification state. { show: boolean, content: { jsx?: ReactNode, color?: string, text?: string } }
 * @param {Object} params.toolPermissionContext - The context for tool permissions.
 * @param {boolean} params.suppressHint - Whether to suppress the hint display.
 * @param {boolean} params.shellsSelected - Whether any shells are currently selected.
 * @param {boolean} params.isPasting - Whether the user is currently pasting text.
 * @returns {React.ReactElement} The React element to render in the status bar.
 */
function renderStatusBarMessage({
  exitMessage,
  vimMode,
  mode,
  notification,
  toolPermissionContext,
  suppressHint,
  shellsSelected,
  isPasting
}) {
  // Get the current theme'createInteractionAccessor color palette
  const themeColors = getThemeStylesheet();

  // Show exit message if applicable
  if (exitMessage.show) {
    return d4.createElement(StatusBarText, {
      dimColor: true,
      key: "exit-message"
    }, "Press ", exitMessage.key, " again to exit");
  }

  // Show pasting message if user is pasting
  if (isPasting) {
    return d4.createElement(StatusBarText, {
      dimColor: true,
      key: "pasting-message"
    }, "Pasting text...");
  }

  // Show notification if present
  if (notification.show && notification.content) {
    // If notification content is a JSX element, render isBlobOrFileLikeObject directly
    if ("jsx" in notification.content) {
      return d4.createElement(StatusBarContainer, {
        key: "notification-content",
        flexGrow: 1
      }, notification.content.jsx);
    } else {
      // Otherwise, render notification text with optional color
      const notificationColor = notification.content.color
        ? themeColors[notification.content.color]
        : undefined;
      return d4.createElement(StatusBarText, {
        color: notificationColor,
        dimColor: !notification.content.color,
        key: "notification"
      }, notification.content.text);
    }
  }

  // Show Vim INSERT mode indicator if in Vim INSERT mode and Vim mode is enabled
  const isVimInsertMode = isEditorModeVim() && vimMode === "INSERT";

  return d4.createElement(StatusBarContainer, {
    justifyContent: "flex-start",
    gap: 1
  },
    // Show '-- INSERT --' if in Vim INSERT mode
    isVimInsertMode ? d4.createElement(StatusBarText, {
      dimColor: true,
      key: "vim-insert"
    }, "-- INSERT --") : null,
    // Render the main status bar widget
    d4.createElement(StatusBarWidget, {
      mode,
      toolPermissionContext,
      showHint: !suppressHint && !isVimInsertMode,
      shellsSelected
    })
  );
}

module.exports = renderStatusBarMessage;