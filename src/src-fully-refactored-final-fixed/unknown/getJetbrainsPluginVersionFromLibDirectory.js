/**
 * Searches for a JetBrains plugin JAR file in the 'lib' subdirectory of the given directory,
 * and extracts the version number from the filename if found.
 *
 * @param {string} baseDirectory - The base directory in which to look for the 'lib' subdirectory.
 * @returns {string|null} The version string if a matching plugin JAR is found, otherwise null.
 */
function getJetbrainsPluginVersionFromLibDirectory(baseDirectory) {
  // Construct the path to the 'lib' directory inside the given base directory
  const libDirectoryPath = K3.join(baseDirectory, "lib");
  // Get the filesystem module (assumed to be provided by f1)
  const fs = f1();

  // Check if the 'lib' directory exists
  if (fs.existsSync(libDirectoryPath)) {
    // Read all entries in the 'lib' directory
    const directoryEntries = fs.readdirSync(libDirectoryPath);
    // Regex to match plugin JAR filenames and capture the version number
    const pluginJarRegex = /^claude-code-jetbrains-plugin-(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)\.jar$/;

    // Iterate over each entry in the directory
    for (const entry of directoryEntries) {
      // Attempt to match the filename against the plugin JAR regex
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

module.exports = getJetbrainsPluginVersionFromLibDirectory;