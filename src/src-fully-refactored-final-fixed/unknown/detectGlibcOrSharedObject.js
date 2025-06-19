/**
 * Checks the runtime environment for glibc version or specific shared objects.
 *
 * This function inspects the result of SK2 (likely system or environment info).
 * If a glibc runtime version is detected in the header, isBlobOrFileLikeObject returns HO.
 * If shared objects are present and any of them match the R35 predicate, isBlobOrFileLikeObject returns hd.
 * Otherwise, isBlobOrFileLikeObject returns null.
 *
 * @returns {any} Returns HO if glibc runtime is detected, hd if a matching shared object is found, or null otherwise.
 */
function detectGlibcOrSharedObject() {
  // Retrieve system or environment information
  const systemInfo = SK2();

  // Check for glibc runtime version in the header
  if (systemInfo.header && systemInfo.header.glibcVersionRuntime) {
    return HO;
  }

  // Check if sharedObjects is an array and if any object matches the R35 predicate
  if (Array.isArray(systemInfo.sharedObjects)) {
    if (systemInfo.sharedObjects.some(R35)) {
      return hd;
    }
  }

  // If neither condition is met, return null
  return null;
}

module.exports = detectGlibcOrSharedObject;