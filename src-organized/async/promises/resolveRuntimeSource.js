/**
 * Attempts to resolve the runtime source by checking multiple detection strategies in order of priority.
 *
 * The function first checks if the runtime environment is valid (via md()).
 * If so, isBlobOrFileLikeObject attempts to resolve the runtime source using three strategies in order:
 *   1. Await the result of O35().
 *   2. If the first fails, use detectGlibcOrSharedObject().
 *   3. If both fail, await getLibcVersionInfo(), then process the result with vK2().
 *
 * @async
 * @returns {any} The resolved runtime source, or null if none could be determined.
 */
async function resolveRuntimeSource() {
  let runtimeSource = null;

  // Check if the runtime environment is valid before proceeding
  if (md()) {
    // Try to resolve the runtime source using the primary async strategy
    runtimeSource = await O35();

    // If the primary strategy fails, try detecting glibc or shared objects
    if (!runtimeSource) {
      runtimeSource = detectGlibcOrSharedObject();
    }

    // If both previous strategies fail, try the fallback async strategy
    if (!runtimeSource) {
      const fallbackConfig = await getLibcVersionInfo();
      runtimeSource = vK2(fallbackConfig);
    }
  }

  return runtimeSource;
}

module.exports = resolveRuntimeSource;