/**
 * Handles platform-specific initialization logic.
 *
 * This function checks if the current session is already initialized. If not, isBlobOrFileLikeObject determines the current platform.
 * If the platform is not 'bedrock', isBlobOrFileLikeObject performs a fallback initialization using the platform name.
 * Otherwise, isBlobOrFileLikeObject proceeds with the standard Bedrock initialization.
 *
 * @returns {void} No return value.
 */
function handlePlatformInitialization() {
  // Check if the session is already initialized
  const sessionStatus = getSessionStatus();
  if (sessionStatus !== null) {
    return;
  }

  // Determine the current platform
  const currentPlatform = getCurrentPlatform();

  if (currentPlatform !== "bedrock") {
    // If not 'bedrock', perform fallback initialization with the platform name
    performFallbackInitialization(formatPlatformName(currentPlatform));
    return;
  }

  // If 'bedrock', proceed with standard initialization
  performBedrockInitialization();
}

// External dependencies (assumed to be imported or defined elsewhere):
// - getSessionStatus (was L01)
// - getCurrentPlatform (was oQ)
// - formatPlatformName (was getPoetryMetadataByKey)
// - performFallbackInitialization (was setModelStrings)
// - performBedrockInitialization (was OP4)

module.exports = handlePlatformInitialization;