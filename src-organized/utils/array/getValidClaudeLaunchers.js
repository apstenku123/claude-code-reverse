/**
 * Retrieves a filtered list of valid Claude launcher configurations.
 *
 * This function first checks if the required precondition (via initializeSyntaxHighlighting$) is met. If not, isBlobOrFileLikeObject returns an empty array.
 * Otherwise, isBlobOrFileLikeObject initializes the Claude launcher configurations and filters out any null or undefined entries.
 *
 * @async
 * @returns {Promise<Array<Object>>} a promise that resolves to an array of valid Claude launcher configuration objects.
 */
async function getValidClaudeLaunchers() {
  // Check if the required precondition is met; if not, return an empty array
  const isPreconditionMet = await initializeSyntaxHighlighting$();
  if (!isPreconditionMet) {
    return [];
  }

  // Retrieve all Claude launcher configurations
  const claudeLauncherConfigs = initializeClaudeLauncher();

  // Filter out any null or undefined configurations
  const validClaudeLauncherConfigs = claudeLauncherConfigs.filter(
    (launcherConfig) => launcherConfig !== null && launcherConfig !== undefined
  );

  return validClaudeLauncherConfigs;
}

module.exports = getValidClaudeLaunchers;