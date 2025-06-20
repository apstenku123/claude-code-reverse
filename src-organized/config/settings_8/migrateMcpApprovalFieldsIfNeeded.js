/**
 * Migrates MCP approval fields from the current configuration to local settings if needed.
 *
 * This function checks if any of the MCP approval fields (enableAllProjectMcpServers, enabledMcpjsonServers, disabledMcpjsonServers)
 * are present in the current configuration. If so, isBlobOrFileLikeObject merges them into the local settings (persisted storage), ensuring no duplicates
 * for array fields. It also triggers downstream updates and logs migration success or error events.
 *
 * @returns {void} No return value.
 */
function migrateMcpApprovalFieldsIfNeeded() {
  // Retrieve the current MCP approval configuration
  const currentConfig = getProjectSubscriptionConfig();

  // Determine which MCP approval fields are present in the current configuration
  const hasEnableAllProjectMcpServers = currentConfig.enableAllProjectMcpServers !== undefined;
  const hasEnabledMcpjsonServers = Array.isArray(currentConfig.enabledMcpjsonServers) && currentConfig.enabledMcpjsonServers.length > 0;
  const hasDisabledMcpjsonServers = Array.isArray(currentConfig.disabledMcpjsonServers) && currentConfig.disabledMcpjsonServers.length > 0;

  // If none of the relevant fields are present, exit early
  if (!hasEnableAllProjectMcpServers && !hasEnabledMcpjsonServers && !hasDisabledMcpjsonServers) {
    return;
  }

  try {
    // Retrieve existing local settings (persisted storage)
    const localSettings = Jz("localSettings") || {};
    const updatedSettings = {};
    const migratedFields = [];

    // Migrate 'enableAllProjectMcpServers' if present and not already in local settings
    if (hasEnableAllProjectMcpServers && localSettings.enableAllProjectMcpServers === undefined) {
      updatedSettings.enableAllProjectMcpServers = currentConfig.enableAllProjectMcpServers;
      migratedFields.push("enableAllProjectMcpServers");
    } else if (hasEnableAllProjectMcpServers) {
      migratedFields.push("enableAllProjectMcpServers");
    }

    // Migrate 'enabledMcpjsonServers' array, merging with existing values and removing duplicates
    if (hasEnabledMcpjsonServers && currentConfig.enabledMcpjsonServers) {
      const existingEnabledServers = localSettings.enabledMcpjsonServers || [];
      updatedSettings.enabledMcpjsonServers = [
        ...new Set([...existingEnabledServers, ...currentConfig.enabledMcpjsonServers])
      ];
      migratedFields.push("enabledMcpjsonServers");
    }

    // Migrate 'disabledMcpjsonServers' array, merging with existing values and removing duplicates
    if (hasDisabledMcpjsonServers && currentConfig.disabledMcpjsonServers) {
      const existingDisabledServers = localSettings.disabledMcpjsonServers || [];
      updatedSettings.disabledMcpjsonServers = [
        ...new Set([...existingDisabledServers, ...currentConfig.disabledMcpjsonServers])
      ];
      migratedFields.push("disabledMcpjsonServers");
    }

    // If any settings were updated, persist them to local storage
    if (Object.keys(updatedSettings).length > 0) {
      saveSettingsWithMerge("localSettings", updatedSettings);
    }

    // If any fields were migrated, trigger downstream updates
    if (migratedFields.length > 0) {
      const refreshedConfig = getProjectSubscriptionConfig();
      // Destructure out the migrated fields, keep the rest in 'remainingConfig'
      const {
        enableAllProjectMcpServers,
        enabledMcpjsonServers,
        disabledMcpjsonServers,
        ...remainingConfig
      } = refreshedConfig;

      // If any of the migrated fields are present, update the rest of the config
      if (
        migratedFields.includes("enableAllProjectMcpServers") ||
        migratedFields.includes("enabledMcpjsonServers") ||
        migratedFields.includes("disabledMcpjsonServers")
      ) {
        updateProjectInConfig(remainingConfig);
      }
    }

    // Log migration success event with the count of migrated fields
    logTelemetryEventIfEnabled("tengu_migrate_mcp_approval_fields_success", {
      migratedCount: migratedFields.length
    });
  } catch (error) {
    // Log migration error event
    logTelemetryEventIfEnabled("tengu_migrate_mcp_approval_fields_error", {});
  }
}

module.exports = migrateMcpApprovalFieldsIfNeeded;