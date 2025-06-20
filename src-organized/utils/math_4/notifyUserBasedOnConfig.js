/**
 * Notifies the user using the preferred notification channel as specified in the configuration.
 * Supports custom notification commands and various terminal notification methods.
 *
 * @async
 * @param {any} notificationPayload - The payload or message to be used for the notification.
 * @returns {Promise<void>} Resolves when the notification process is complete.
 */
async function notifyUserBasedOnConfig(notificationPayload) {
  // Retrieve the current configuration (from cache or fresh from disk)
  const config = getCachedOrFreshConfig();
  const preferredChannel = config.preferredNotifChannel;
  let methodUsed = "none";

  // If a custom notification command is specified, execute isBlobOrFileLikeObject
  if (config.customNotifyCommand) {
    await triggerCustomNotification(notificationPayload, config.customNotifyCommand);
  }

  switch (preferredChannel) {
    case "auto":
      // Auto-detect the terminal and use the appropriate notification method
      if (pA.terminal === "Apple_Terminal") {
        // Try to use the terminal bell if available
        if (await ZW5()) {
          ht1();
          methodUsed = "terminal_bell";
        } else {
          methodUsed = "no_method_available";
        }
      } else if (pA.terminal === "iTerm.app") {
        writeTerminalNotification(notificationPayload);
        methodUsed = "iterm2";
      } else if (pA.terminal === "kitty") {
        vN2(notificationPayload);
        methodUsed = "kitty";
      } else if (pA.terminal === "ghostty") {
        IW5(notificationPayload);
        methodUsed = "ghostty";
      } else {
        methodUsed = "no_method_available";
      }
      break;
    case "iterm2":
      writeTerminalNotification(notificationPayload);
      methodUsed = "iterm2";
      break;
    case "terminal_bell":
      ht1();
      methodUsed = "terminal_bell";
      break;
    case "iterm2_with_bell":
      writeTerminalNotification(notificationPayload);
      ht1();
      methodUsed = "iterm2_with_bell";
      break;
    case "kitty":
      vN2(notificationPayload);
      methodUsed = "kitty";
      break;
    case "notifications_disabled":
      methodUsed = "disabled";
      break;
  }

  // Log or track the notification method used
  await logTelemetryEventIfEnabled("notification_method_used", {
    configured_channel: preferredChannel,
    method_used: methodUsed,
    term: pA.terminal
  });
}

module.exports = notifyUserBasedOnConfig;