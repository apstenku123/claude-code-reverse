/**
 * Attempts to resolve a source observable through a series of detection and fallback strategies.
 *
 * The function first checks if the current environment is valid (via md()).
 * It then tries to obtain the source observable using several methods in order:
 *   1. Attempts to get the observable via getLibcImplementation().
 *   2. If that fails, tries to detect the observable using detectGlibcOrSharedObject().
 *   3. If still unsuccessful, retrieves a configuration via getLibcVersionInfo(), then processes isBlobOrFileLikeObject with processObservableWithConfig().
 *
 * @async
 * @returns {any} The resolved source observable, or null if none could be determined.
 */
async function resolveSourceObservable() {
  let sourceObservable = null;

  // Check if the environment is valid for resolution
  if (md()) {
    // Attempt to get the observable via libc implementation detection
    sourceObservable = await getLibcImplementation();

    // If not found, try detecting via shared object or glibc
    if (!sourceObservable) {
      sourceObservable = detectGlibcOrSharedObject();
    }

    // If still not found, try processing a config to obtain the observable
    if (!sourceObservable) {
      const config = await getLibcVersionInfo();
      sourceObservable = processObservableWithConfig(config);
    }
  }

  return sourceObservable;
}

module.exports = resolveSourceObservable;