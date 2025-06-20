/**
 * Searches for a JetBrains plugin JAR file in the 'lib' subdirectory of the given base directory,
 * and extracts the version number from its filename if found.
 *
 * @param {string} baseDirectory - The base directory in which to look for the 'lib' folder containing the plugin JAR.
 * @returns {string|null} The version string extracted from the plugin JAR filename, or null if not found.
 */
function getJetbrainsPluginVersionFromLibDir(baseDirectory) {
  // Construct the path to the 'lib' directory inside the given base directory
  const libDirectoryPath = K3.join(baseDirectory, "lib");

  // Get the file system accessor (e.g., fs module or similar abstraction)
  const fileSystem = f1();

  // Check if the 'lib' directory exists
  if (fileSystem.existsSync(libDirectoryPath)) {
    // Read all entries in the 'lib' directory
    const directoryEntries = fileSystem.readdirSync(libDirectoryPath);
    // Regex to match the JetBrains plugin JAR filename and capture the version
    const pluginJarRegex = /^claude-code-jetbrains-plugin-(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)\.jar$/;

    // Iterate over each entry in the directory
    for (const entry of directoryEntries) {
      // Attempt to match the filename against the plugin JAR pattern
      const match = entry.name.match(pluginJarRegex);
      if (match) {
        // Return the captured version string
        return match[1];
      }
    }
  }
  // Return null if no matching plugin JAR is found
  return null;
}

module.exports = getJetbrainsPluginVersionFromLibDir;