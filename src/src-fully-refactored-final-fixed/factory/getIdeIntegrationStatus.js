/**
 * Generates a status report for IDE integration, including connection and installation state.
 *
 * @param {Array<Object>} pluginStatusList - List of plugin status objects, each representing a plugin (should include at least one with name 'ide').
 * @param {Object|null} extensionConfig - Optional configuration object for the extension, may include installation and error info.
 * @returns {Object|null} Status report object with title, command, and items array, or null if prerequisites are not met.
 */
function getIdeIntegrationStatus(pluginStatusList, extensionConfig = null) {
  // Check if prerequisites for IDE integration are met
  if (!qw() || !pA.terminal) return null;

  // Find the IDE plugin status object
  const idePluginStatus = pluginStatusList?.find(plugin => plugin.name === "ide");

  // Get the human-readable name of the current terminal/editor
  const editorDisplayName = getEditorDisplayName(pA.terminal);

  // Array to accumulate status items
  const statusItems = [];

  // Add connection status
  if (idePluginStatus) {
    if (idePluginStatus.type === "connected") {
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

  // Add installation status
  if (extensionConfig && extensionConfig.installed) {
    // If installed, check for version mismatch
    if (
      extensionConfig &&
      idePluginStatus &&
      idePluginStatus.type === "connected" &&
      extensionConfig.installedVersion !== idePluginStatus.serverInfo?.version
    ) {
      statusItems.push({
        label: `Installed ${editorDisplayName} extension version ${extensionConfig.installedVersion} (server version: ${idePluginStatus.serverInfo?.version})`,
        type: "info"
      });
    } else if (kZ && idePluginStatus?.type !== "connected") {
      // Installed but not connected, and kZ is truthy (likely JetBrains)
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

  // Add error status if present
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

module.exports = getIdeIntegrationStatus;