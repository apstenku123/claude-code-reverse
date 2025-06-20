/**
 * Retrieves the path to the 'managed-settings.json' file using the GT1 accessor and the Mi path resolver.
 *
 * @returns {string} The resolved path to the 'managed-settings.json' configuration file.
 */
function getManagedSettingsJsonPath() {
  // Obtain the base directory or configuration root using the GT1 accessor
  const baseDirectory = GT1();

  // Resolve the full path to 'managed-settings.json' using the Mi path resolver
  const managedSettingsPath = Mi(baseDirectory, "managed-settings.json");

  return managedSettingsPath;
}

module.exports = getManagedSettingsJsonPath;