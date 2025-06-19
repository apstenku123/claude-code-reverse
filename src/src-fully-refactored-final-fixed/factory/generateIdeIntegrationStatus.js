/**
 * Generates a status summary for IDE integration, including connection and installation state.
 *
 * @param {Array<Object>} integrations - Array of integration objects, each representing an IDE integration.
 * @param {Object|null} extensionInfo - Optional object containing information about the installed extension/plugin.
 * @param {boolean} extensionInfo.installed - Whether the extension/plugin is installed.
 * @param {string} extensionInfo.installedVersion - The installed version of the extension/plugin.
 * @param {string} extensionInfo.error - Error message if installation failed.
 * @returns {Object|null} Status object with title, command, and items array, or null if integration is not available.
 */
function generateIdeIntegrationStatus(integrations, extensionInfo = null) {
  // Early exit if integration is not available
  if (!qw() || !pA.terminal) return null;

  // Find the IDE integration entry
  const ideIntegration = integrations?.find(integration => integration.name === "ide");
  // Get the human-readable editor name
  const editorDisplayName = getEditorDisplayName(pA.terminal);
  // Array to accumulate status items
  const statusItems = [];

  // Connection status
  if (ideIntegration) {
    if (ideIntegration.type === "connected") {
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

  // Extension/plugin installation status
  if (extensionInfo && extensionInfo.installed) {
    // If connected, but versions mismatch
    if (
      extensionInfo &&
      ideIntegration &&
      ideIntegration.type === "connected" &&
      extensionInfo.installedVersion !== ideIntegration.serverInfo?.version
    ) {
      statusItems.push({
        label: `Installed ${editorDisplayName} extension version ${extensionInfo.installedVersion} (server version: ${ideIntegration.serverInfo?.version})`,
        type: "info"
      });
    } else if (kZ && ideIntegration?.type !== "connected") {
      // Plugin installed but not connected (JetBrains-specific)
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

  // Installation error handling
  if (extensionInfo && extensionInfo.error) {
    if (kZ) {
      // JetBrains-specific error message
      statusItems.push({
        label: `Error installing ${editorDisplayName} plugin: ${extensionInfo.error}\nPlease restart your IDE or try installing from https://docs.anthropic.com/createInteractionAccessor/claude-code-jetbrains`,
        type: "error"
      });
    } else {
      // Generic error message
      statusItems.push({
        label: `Error installing ${editorDisplayName} extension: ${extensionInfo.error}\nPlease restart your IDE and try again.`,
        type: "error"
      });
    }
  }

  // Return the status summary object
  return {
    title: "IDE Integration",
    command: "/config",
    items: statusItems
  };
}

module.exports = generateIdeIntegrationStatus;