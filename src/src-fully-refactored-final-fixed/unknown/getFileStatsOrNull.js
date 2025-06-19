/**
 * Retrieves file or directory statistics for the given path using rl.statSync.
 * Returns the stats object if the path exists, or null if an error occurs (e.g., file does not exist).
 *
 * @param {string} filePath - The path to the file or directory to retrieve stats for.
 * @returns {fs.Stats|null} The stats object if successful, or null if the path does not exist or an error occurs.
 */
function getFileStatsOrNull(filePath) {
  try {
    // Attempt to retrieve file or directory statistics synchronously
    return rl.statSync(filePath);
  } catch (error) {
    // If an error occurs (e.g., file does not exist), return null
    return null;
  }
}

module.exports = getFileStatsOrNull;