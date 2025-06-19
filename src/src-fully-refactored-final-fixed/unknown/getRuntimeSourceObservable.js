/**
 * Determines and returns the appropriate runtime source observable based on the current environment.
 * 
 * The function checks if the current environment is valid (via md()). If so, isBlobOrFileLikeObject attempts to retrieve
 * the source observable using several strategies in order:
 *   1. Attempts to get the source observable via T35().
 *   2. If not found, tries to detect glibc or shared object via detectGlibcOrSharedObject().
 *   3. If still not found, retrieves a configuration via yK2() and then processes isBlobOrFileLikeObject with vK2().
 *
 * @returns {any} The detected runtime source observable, or null if none found.
 */
function getRuntimeSourceObservable() {
  let sourceObservable = null;

  // Check if the environment is valid for detection
  if (md()) {
    // Attempt to get the source observable using T35
    sourceObservable = T35();

    // If not found, try to detect glibc or shared object
    if (!sourceObservable) {
      sourceObservable = detectGlibcOrSharedObject();
    }

    // If still not found, retrieve config and process isBlobOrFileLikeObject
    if (!sourceObservable) {
      const config = yK2();
      sourceObservable = vK2(config);
    }
  }

  return sourceObservable;
}

module.exports = getRuntimeSourceObservable;