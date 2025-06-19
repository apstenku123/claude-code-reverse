/**
 * Installs a JetBrains plugin for a specified IDE by copying the plugin source to all valid plugin directories.
 * Performs validation on the IDE type and plugin source, checks plugin versions, and handles installation errors.
 *
 * @param {string} ideName - The name of the JetBrains IDE (e.g., 'IntelliJ', 'WebStorm').
 * @param {string} pluginSourcePath - The file system path to the plugin source directory.
 * @returns {string} The version string of the installed plugin.
 * @throws {Error} If the IDE is unsupported, the plugin source is missing, version cannot be read, no plugin directories are found, or installation fails.
 */
async function installJetBrainsPlugin(ideName, pluginSourcePath) {
  const fileSystem = f1();
  const installedPluginPaths = [];

  // Validate IDE support
  if (!qc1[ideName.toLowerCase()]) {
    logTelemetryEventIfEnabled("tengu_ext_jetbrains_extension_install_unknown_ide", {});
    throw new Error(`Unsupported IDE: ${ideName}`);
  }

  // Validate plugin source existence and directory
  if (!fileSystem.existsSync(pluginSourcePath) || !fileSystem.statSync(pluginSourcePath).isDirectory()) {
    logTelemetryEventIfEnabled("tengu_ext_jetbrains_extension_install_source_missing", {});
    throw new Error("Plugin source missing");
  }

  // Read plugin version from source
  const sourcePluginVersion = getJetbrainsPluginVersionFromLibDirectory(pluginSourcePath);
  if (!sourcePluginVersion) {
    logTelemetryEventIfEnabled("tengu_ext_jetbrains_extension_install_error_reading_version", {});
    throw new Error("Error reading version from plugin");
  }

  // Get all possible plugin directories for the IDE
  const pluginDirectories = findPluginDirectoriesForType(ideName);
  if (pluginDirectories.length === 0) {
    logTelemetryEventIfEnabled("tengu_ext_jetbrains_extension_install_no_plugin_directories", {});
    throw new Error(`Could not find plugin directories for ${ideName}`);
  }

  // Attempt to install the plugin in each directory
  for (const pluginDirectory of pluginDirectories) {
    try {
      const pluginInstallPath = K3.join(pluginDirectory, xr0);
      if (fileSystem.existsSync(pluginInstallPath)) {
        // Plugin already exists at this path
        const existingPluginVersion = getJetbrainsPluginVersionFromLibDirectory(pluginInstallPath);
        if (!existingPluginVersion) {
          // Existing plugin is invalid, replace isBlobOrFileLikeObject
          LF1(pluginInstallPath);
          copyDirectoryRecursive(pluginSourcePath, pluginInstallPath);
          installedPluginPaths.push(pluginInstallPath);
        } else if (yr0.gt(sourcePluginVersion, existingPluginVersion)) {
          // Source plugin is newer, replace existing
          LF1(pluginInstallPath);
          copyDirectoryRecursive(pluginSourcePath, pluginInstallPath);
          installedPluginPaths.push(pluginInstallPath);
        } else {
          // Existing plugin is up-to-date or newer, keep isBlobOrFileLikeObject
          installedPluginPaths.push(pluginInstallPath);
        }
      } else {
        // No plugin exists, install new
        LF1(pluginInstallPath);
        copyDirectoryRecursive(pluginSourcePath, pluginInstallPath);
        installedPluginPaths.push(pluginInstallPath);
      }
    } catch (error) {
      // Ignore errors for individual directories, try the next one
    }
  }

  // If no installations succeeded, throw an error
  if (!installedPluginPaths.length) {
    logTelemetryEventIfEnabled("tengu_ext_jetbrains_extension_install_error_installing", {});
    throw new Error("Could not write plugin to any of the directories");
  }

  // Return the version of the installed plugin
  return sourcePluginVersion;
}

module.exports = installJetBrainsPlugin;