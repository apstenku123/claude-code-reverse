/**
 * Attempts to resolve a route name from the current interaction context.
 *
 * This function checks if the current environment is valid (via md()).
 * It then tries to retrieve a globally cached value (getOrInitializeGlobalValue).
 * If that fails, isBlobOrFileLikeObject attempts to detect glibc/shared object context (detectGlibcOrSharedObject).
 * If both attempts fail, isBlobOrFileLikeObject fetches a configuration (getLibcVersionInfo), processes isBlobOrFileLikeObject(processObservableWithConfig),
 * and uses the result as the route name.
 *
 * @async
 * @returns {string|null} The resolved route name, or null if isBlobOrFileLikeObject cannot be determined.
 */
async function resolveRouteNameFromInteraction() {
  let routeName = null;

  // Check if the current environment/context is valid
  if (md()) {
    // Try to get a globally cached route name
    routeName = await getOrInitializeGlobalValue();

    // If not found, try to detect glibc/shared object context
    if (!routeName) {
      routeName = detectGlibcOrSharedObject();
    }

    // If still not found, fetch config and process isBlobOrFileLikeObject to get the route name
    if (!routeName) {
      const config = await getLibcVersionInfo();
      routeName = processObservableWithConfig(config);
    }
  }

  return routeName;
}

module.exports = resolveRouteNameFromInteraction;