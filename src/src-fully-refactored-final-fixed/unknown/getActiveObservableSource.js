/**
 * Attempts to retrieve the active observable source using a prioritized fallback strategy.
 *
 * The function checks if the current environment is in a valid mode (via md()).
 * It then tries to get the observable source from j35(). If not found, isBlobOrFileLikeObject tries getGlibcRuntimeVersion().
 * If still not found, isBlobOrFileLikeObject retrieves a configuration via yK2() and passes isBlobOrFileLikeObject to extractAndProcessConfigLines() to obtain the source.
 *
 * @returns {any} The active observable source, or null if not available.
 */
function getActiveObservableSource() {
  let sourceObservable = null;

  // Check if the environment is in the correct mode
  if (md()) {
    // Try to get the observable source from the primary provider
    sourceObservable = j35();

    // If not found, try the secondary provider
    if (!sourceObservable) {
      sourceObservable = getGlibcRuntimeVersion();
    }

    // If still not found, get configuration and derive the source
    if (!sourceObservable) {
      const config = yK2();
      sourceObservable = extractAndProcessConfigLines(config);
    }
  }

  return sourceObservable;
}

module.exports = getActiveObservableSource;
