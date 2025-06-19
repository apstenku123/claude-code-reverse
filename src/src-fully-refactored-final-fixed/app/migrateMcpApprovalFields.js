/**
 * Migrates MCP approval fields from the current application state into local settings if needed.
 * This function checks for the presence of MCP server configuration fields in the current state,
 * merges them with any existing local settings, updates local storage if necessary, and triggers
 * analytics events for success or error. It also triggers a downstream update if migration occurred.
 *
 * @returns {void} No return value.
 */
function migrateMcpApprovalFields() {
  // Retrieve current MCP server configuration from application state
  const currentSettings = getProjectSubscriptionConfig();

  const hasEnableAllProjectMcpServers = currentSettings.enableAllProjectMcpServers !== undefined;
  const hasEnabledMcpjsonServers = Array.isArray(currentSettings.enabledMcpjsonServers) && currentSettings.enabledMcpjsonServers.length > 0;
  const hasDisabledMcpjsonServers = Array.isArray(currentSettings.disabledMcpjsonServers) && currentSettings.disabledMcpjsonServers.length > 0;

  // If none of the relevant fields are present, exit early
  if (!hasEnableAllProjectMcpServers && !hasEnabledMcpjsonServers && !hasDisabledMcpjsonServers) {
    return;
  }

  try {
    // Retrieve existing local settings (if any)
    const localSettings = Jz("localSettings") || {};
    const settingsToUpdate = {};
    const migratedFields = [];

    // Migrate 'enableAllProjectMcpServers' if present and not already in local settings
    if (hasEnableAllProjectMcpServers && localSettings.enableAllProjectMcpServers === undefined) {
      settingsToUpdate.enableAllProjectMcpServers = currentSettings.enableAllProjectMcpServers;
      migratedFields.push("enableAllProjectMcpServers");
    } else if (hasEnableAllProjectMcpServers) {
      migratedFields.push("enableAllProjectMcpServers");
    }

    // Migrate 'enabledMcpjsonServers' by merging with local settings and removing duplicates
    if (hasEnabledMcpjsonServers && currentSettings.enabledMcpjsonServers) {
      const existingEnabled = localSettings.enabledMcpjsonServers || [];
      settingsToUpdate.enabledMcpjsonServers = [
        ...new Set([...existingEnabled, ...currentSettings.enabledMcpjsonServers])
      ];
      migratedFields.push("enabledMcpjsonServers");
    }

    // Migrate 'disabledMcpjsonServers' by merging with local settings and removing duplicates
    if (hasDisabledMcpjsonServers && currentSettings.disabledMcpjsonServers) {
      const existingDisabled = localSettings.disabledMcpjsonServers || [];
      settingsToUpdate.disabledMcpjsonServers = [
        ...new Set([...existingDisabled, ...currentSettings.disabledMcpjsonServers])
      ];
      migratedFields.push("disabledMcpjsonServers");
    }

    // If any settings need to be updated, persist them to local storage
    if (Object.keys(settingsToUpdate).length > 0) {
      saveSettingsWithMerge("localSettings", settingsToUpdate);
    }

    // If any fields were migrated, trigger downstream update
    if (migratedFields.length > 0) {
      const updatedSettings = getProjectSubscriptionConfig();
      const {
        enableAllProjectMcpServers,
        enabledMcpjsonServers,
        disabledMcpjsonServers,
        ...otherSettings
      } = updatedSettings;

      // If any of the migrated fields are present, update application state
      if (
        migratedFields.includes("enableAllProjectMcpServers") ||
        migratedFields.includes("enabledMcpjsonServers") ||
        migratedFields.includes("disabledMcpjsonServers")
      ) {
        updateProjectInConfig(otherSettings);
      }
    }

    // Report migration success with the number of fields migrated
    logTelemetryEventIfEnabled("tengu_migrate_mcp_approval_fields_success", {
      migratedCount: migratedFields.length
    });
  } catch (error) {
    // Report migration error
    logTelemetryEventIfEnabled("tengu_migrate_mcp_approval_fields_error", {});
  }
}

module.exports = migrateMcpApprovalFields;