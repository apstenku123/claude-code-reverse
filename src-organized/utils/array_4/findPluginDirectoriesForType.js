/**
 * Searches for plugin directories matching specific patterns for a given type.
 *
 * @param {string} pluginType - The type of plugin to search for (case-insensitive).
 * @returns {string[]} Array of absolute paths to found plugin directories, with duplicates removed.
 */
function findPluginDirectoriesForType(pluginType) {
  const foundDirectories = [];
  const fs = f1(); // File system module abstraction
  const searchPaths = getJetBrainsConfigDirectories(pluginType); // Get possible search paths for the plugin type
  const pluginPatterns = qc1[pluginType.toLowerCase()]; // Get plugin name patterns for the type

  if (!pluginPatterns) {
    // If no patterns are defined for this plugin type, return empty array
    return foundDirectories;
  }

  for (const searchPath of searchPaths) {
    if (!fs.existsSync(searchPath)) {
      // Skip if the search path does not exist
      continue;
    }

    for (const pattern of pluginPatterns) {
      // Create a regex to match directory names starting with the pattern
      const pluginNameRegex = new RegExp(`^${pattern}.*$`);

      // Read all entries in the search path, filter for directories matching the pattern
      const matchingDirectories = fs.readdirSync(searchPath)
        .filter(entry =>
          pluginNameRegex.test(entry.name) &&
          fs.statSync(K3.join(searchPath, entry.name)).isDirectory()
        )
        .map(entry => K3.join(searchPath, entry.name));

      for (const directory of matchingDirectories) {
        // On Linux, use the directory as-is; on other platforms, look for a 'plugins' subdirectory
        const pluginDir = io.platform() === "linux"
          ? directory
          : K3.join(directory, "plugins");

        if (fs.existsSync(pluginDir)) {
          foundDirectories.push(pluginDir);
        }
      }
    }
  }

  // Remove duplicates by filtering for the first occurrence of each path
  return foundDirectories.filter((dir, index) => foundDirectories.indexOf(dir) === index);
}

module.exports = findPluginDirectoriesForType;