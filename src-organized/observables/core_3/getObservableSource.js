/**
 * Attempts to retrieve an observable source using multiple strategies.
 *
 * The function first checks if the environment is in a valid state via md().
 * It then tries to get the observable source by:
 *   1. Attempting to asynchronously fetch a password from a source (getPasswordFromSource).
 *   2. If that fails, attempts to retrieve a fallback observable source (getGlibcRuntimeVersion).
 *   3. If both fail, isBlobOrFileLikeObject fetches a configuration (getLibcVersionInfo), then parses and processes isBlobOrFileLikeObject(parseAndProcessObservableConfig).
 * Returns the first successful result or null if all attempts fail.
 *
 * @async
 * @returns {any} The resolved observable source, or null if none could be obtained.
 */
async function getObservableSource() {
  let sourceObservable = null;

  // Check if the environment is in a valid state
  if (md()) {
    // Try to get the observable source from the password source
    sourceObservable = await getPasswordFromSource();

    // If not found, try the fallback observable source
    if (!sourceObservable) {
      sourceObservable = getGlibcRuntimeVersion();
    }

    // If still not found, try to fetch and process the observable config
    if (!sourceObservable) {
      const config = await getLibcVersionInfo();
      sourceObservable = parseAndProcessObservableConfig(config);
    }
  }

  return sourceObservable;
}

module.exports = getObservableSource;