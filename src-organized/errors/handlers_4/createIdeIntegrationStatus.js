/**
 * Generates a status report for IDE integration, including connection and installation status.
 *
 * @param {Array<Object>} interactionEntries - Array of interaction entries, typically representing IDE/plugin connections.
 * @param {Object|null} extensionConfig - Optional configuration object for the installed extension/plugin.
 * @param {boolean} extensionConfig.installed - Indicates if the extension/plugin is installed.
 * @param {string} extensionConfig.installedVersion - The installed version of the extension/plugin.
 * @param {string} extensionConfig.error - Error message if installation failed.
 * @returns {Object|null} Status object containing title, command, and items array, or null if integration is unavailable.
 */
function createIdeIntegrationStatus(interactionEntries, extensionConfig = null) {
  // Check if integration is available and terminal info exists
  if (!qw() || !pA.terminal) return null;

  // Find the IDE subscription entry
  const ideSubscription = interactionEntries?.find(entry => entry.name === "ide");

  // Get the human-readable IDE/editor name
  const editorDisplayName = getEditorDisplayName(pA.terminal);

  // Array to accumulate status items
  const statusItems = [];

  // Report connection status
  if (ideSubscription) {
    if (ideSubscription.type === "connected") {
      statusItems.push({
        label: `Connected to ${editorDisplayName} extension`,
        type: "check"
      });
    } else {
      statusItems.push({
        label: `Not connected to ${editorDisplayName}`,
        type: "error"
      });
    }
  }

  // Report installation status if config is provided
  if (extensionConfig && extensionConfig.installed) {
    // If connected but versions mismatch, show info
    if (
      extensionConfig &&
      ideSubscription &&
      ideSubscription.type === "connected" &&
      extensionConfig.installedVersion !== ideSubscription.serverInfo?.version
    ) {
      statusItems.push({
        label: `Installed ${editorDisplayName} extension version ${extensionConfig.installedVersion} (server version: ${ideSubscription.serverInfo?.version})`,
        type: "info"
      });
    }
    // If plugin is installed but not connected, show info with help link
    else if (kZ && ideSubscription?.type !== "connected") {
      statusItems.push({
        label: `Installed ${editorDisplayName} plugin but connection is not established.\nPlease restart your IDE or try installing from https://docs.anthropic.com/createInteractionAccessor/claude-code-jetbrains`,
        type: "info"
      });
    }
    // Otherwise, just show installed status
    else {
      statusItems.push({
        label: `Installed ${editorDisplayName} extension`,
        type: "check"
      });
    }
  }

  // Report installation errors if present
  if (extensionConfig && extensionConfig.error) {
    if (kZ) {
      statusItems.push({
        label: `Error installing ${editorDisplayName} plugin: ${extensionConfig.error}\nPlease restart your IDE or try installing from https://docs.anthropic.com/createInteractionAccessor/claude-code-jetbrains`,
        type: "error"
      });
    } else {
      statusItems.push({
        label: `Error installing ${editorDisplayName} extension: ${extensionConfig.error}\nPlease restart your IDE and try again.`,
        type: "error"
      });
    }
  }

  // Return the status report object
  return {
    title: "IDE Integration",
    command: "/config",
    items: statusItems
  };
}

module.exports = createIdeIntegrationStatus;