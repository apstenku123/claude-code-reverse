/**
 * Renders status bar messages and notifications for the CLI UI.
 *
 * This function determines which status or notification message should be displayed
 * in the application'createInteractionAccessor status bar, based on the current UI state (such as exit message,
 * paste mode, notifications, Vim mode, etc.).
 *
 * @param {Object} params - The parameters for rendering status bar messages.
 * @param {Object} params.exitMessage - Information about the exit message prompt.
 * @param {boolean} params.exitMessage.show - Whether to show the exit message.
 * @param {string} params.exitMessage.key - The key to press again to exit.
 * @param {string} params.vimMode - The current Vim mode (e.g., 'INSERT', 'NORMAL').
 * @param {string} params.mode - The current application mode.
 * @param {Object} params.notification - Notification object to display.
 * @param {boolean} params.notification.show - Whether to show the notification.
 * @param {Object} params.notification.content - The notification content.
 * @param {string} [params.notification.content.text] - The notification text.
 * @param {string} [params.notification.content.color] - The color key for the notification.
 * @param {Object} [params.notification.content.jsx] - JSX content for the notification.
 * @param {Object} params.toolPermissionContext - Context for tool permissions.
 * @param {boolean} params.suppressHint - Whether to suppress the hint message.
 * @param {Array} params.shellsSelected - List of selected shells.
 * @param {boolean} params.isPasting - Whether the user is currently pasting text.
 * @returns {React.ReactNode} The rendered status bar message(createInteractionAccessor) as React elements.
 */
function renderStatusBarMessages({
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
    }, `Press ${exitMessage.key} again to exit`);
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
    // If notification content is JSX, render isBlobOrFileLikeObject directly
    if ("jsx" in notification.content) {
      return d4.createElement(StatusBarContainer, {
        key: "notification-content",
        flexGrow: 1
      }, notification.content.jsx);
    } else {
      // Otherwise, render text notification with optional color
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

  // Check if Vim INSERT mode is active and the environment supports Vim mode
  const isVimInsertMode = isEditorModeVim() && vimMode === "INSERT";

  // Render the default status bar with Vim mode and hint
  return d4.createElement(StatusBarContainer, {
    justifyContent: "flex-start",
    gap: 1
  },
    isVimInsertMode
      ? d4.createElement(StatusBarText, {
          dimColor: true,
          key: "vim-insert"
        }, "-- INSERT --")
      : null,
    d4.createElement(StatusBarHint, {
      mode,
      toolPermissionContext,
      showHint: !suppressHint && !isVimInsertMode,
      shellsSelected
    })
  );
}

module.exports = renderStatusBarMessages;