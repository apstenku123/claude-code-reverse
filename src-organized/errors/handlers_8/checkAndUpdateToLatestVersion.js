/**
 * Checks if the environment is ready, then attempts to fetch and install the latest version.
 * If the environment is not ready, returns null values. Handles errors gracefully.
 *
 * @async
 * @returns {Promise<{latestVersion: string|null, wasUpdated: boolean}>} An object containing the latest version (or null) and whether an update occurred.
 */
async function checkAndUpdateToLatestVersion() {
  // Check if the environment is ready for update operations
  const isEnvironmentReady = await initializeSyntaxHighlighting$();
  if (!isEnvironmentReady) {
    return {
      latestVersion: null,
      wasUpdated: false
    };
  }

  try {
    // Attempt to fetch the latest version information
    const latestVersion = await zP2();
    // Attempt to perform the update (returns true if updated, false otherwise)
    const wasUpdated = await acquireVersionLockIfValid();
    return {
      latestVersion,
      wasUpdated
    };
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(new Error(`Failed to check/install latest version: ${error}`));
    return {
      latestVersion: null,
      wasUpdated: false
    };
  }
}

module.exports = checkAndUpdateToLatestVersion;
