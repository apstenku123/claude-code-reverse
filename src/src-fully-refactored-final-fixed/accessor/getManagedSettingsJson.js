/**
 * Retrieves the managed settings JSON configuration using the GT1 accessor.
 *
 * This function calls the GT1 accessor to obtain the relevant configuration source,
 * then retrieves the 'managed-settings.json' configuration using the Mi accessor.
 *
 * @returns {string} The contents or path of the managed-settings.json configuration.
 */
function getManagedSettingsJson() {
  // Obtain the configuration source using the GT1 accessor
  const configurationSource = GT1();
  // Retrieve the 'managed-settings.json' configuration using the Mi accessor
  return Mi(configurationSource, "managed-settings.json");
}

module.exports = getManagedSettingsJson;