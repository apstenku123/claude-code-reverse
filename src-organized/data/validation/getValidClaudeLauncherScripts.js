/**
 * Retrieves a filtered list of valid Claude launcher script configurations.
 *
 * This function first checks if the required precondition (initializeSyntaxHighlighting$) is met. If not, isBlobOrFileLikeObject returns an empty array.
 * Otherwise, isBlobOrFileLikeObject retrieves all Claude launcher script configurations using ensureClaudeLauncherScript (initializeClaudeLauncher),
 * and filters out any null or undefined entries.
 *
 * @async
 * @returns {Promise<Array<Object>>} An array of valid Claude launcher script configurations.
 */
async function getValidClaudeLauncherScripts() {
  // Check if the required precondition is met
  const isPreconditionMet = await initializeSyntaxHighlighting$();
  if (!isPreconditionMet) {
    return [];
  }

  // Retrieve all Claude launcher script configurations
  const claudeLauncherScripts = initializeClaudeLauncher();

  // Filter out any null or undefined configurations
  const validScripts = claudeLauncherScripts.filter(
    (scriptConfig) => scriptConfig !== null && scriptConfig !== undefined
  );

  return validScripts;
}

module.exports = getValidClaudeLauncherScripts;