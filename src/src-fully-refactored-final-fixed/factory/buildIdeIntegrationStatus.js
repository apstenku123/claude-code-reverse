/**
 * Builds a status report for IDE integration, including connection and installation status.
 *
 * @param {Array<Object>} interactionEntries - Array of interaction entries, typically containing plugin connection info.
 * @param {Object|null} config - Optional configuration object containing installation and error info for the IDE extension.
 * @param {boolean} config.installed - Whether the extension/plugin is installed.
 * @param {string} config.installedVersion - The installed version of the extension/plugin.
 * @param {string} config.error - Error message if installation failed.
 * @returns {Object|null} Status object with title, command, and items array, or null if not applicable.
 */
function buildIdeIntegrationStatus(interactionEntries, config = null) {
  // Check if IDE integration is available and terminal info is present
  if (!qw() || !pA.terminal) return null;

  // Find the IDE subscription entry
  const ideSubscription = interactionEntries?.find(entry => entry.name === "ide");

  // Get the human-readable IDE/editor display name
  const editorDisplayName = getEditorDisplayName(pA.terminal);

  // Array to accumulate status items
  const statusItems = [];

  // Handle IDE connection status
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

  // Handle extension/plugin installation status
  if (config && config.installed) {
    // If installed, check for version mismatch when connected
    if (
      config &&
      ideSubscription &&
      ideSubscription.type === "connected" &&
      config.installedVersion !== ideSubscription.serverInfo?.version
    ) {
      statusItems.push({
        label: `Installed ${editorDisplayName} extension version ${config.installedVersion} (server version: ${ideSubscription.serverInfo?.version})`,
        type: "info"
      });
    } else if (kZ && ideSubscription?.type !== "connected") {
      // Installed but not connected, and using plugin variant
      statusItems.push({
        label: `Installed ${editorDisplayName} plugin but connection is not established.\nPlease restart your IDE or try installing from https://docs.anthropic.com/createInteractionAccessor/claude-code-jetbrains`,
        type: "info"
      });
    } else {
      // Installed and no issues
      statusItems.push({
        label: `Installed ${editorDisplayName} extension`,
        type: "check"
      });
    }
  }

  // Handle installation errors
  if (config && config.error) {
    if (kZ) {
      statusItems.push({
        label: `Error installing ${editorDisplayName} plugin: ${config.error}\nPlease restart your IDE or try installing from https://docs.anthropic.com/createInteractionAccessor/claude-code-jetbrains`,
        type: "error"
      });
    } else {
      statusItems.push({
        label: `Error installing ${editorDisplayName} extension: ${config.error}\nPlease restart your IDE and try again.`,
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

module.exports = buildIdeIntegrationStatus;