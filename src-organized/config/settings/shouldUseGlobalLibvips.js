/**
 * Determines whether to use the global libvips library based on environment variables and system architecture.
 *
 * Checks for explicit environment variable overrides, Rosetta emulation, and configuration presence.
 *
 * @param {any} sourceObservable - The source observable to return or pass to the notification function.
 * @returns {any} Returns the source observable, possibly wrapped by a notification function, or a boolean indicating if the global libvips should be used.
 */
function shouldUseGlobalLibvips(sourceObservable) {
  // Check if the environment variable to ignore global libvips is set
  if (Boolean(process.env.SHARP_IGNORE_GLOBAL_LIBVIPS) === true) {
    // Notify that global libvips should NOT be used due to environment override
    return returnSourceWithOptionalNotice(false, "SHARP_IGNORE_GLOBAL_LIBVIPS", sourceObservable);
  }

  // Check if the environment variable to force global libvips is set
  if (Boolean(process.env.SHARP_FORCE_GLOBAL_LIBVIPS) === true) {
    // Notify that global libvips SHOULD be used due to environment override
    return returnSourceWithOptionalNotice(true, "SHARP_FORCE_GLOBAL_LIBVIPS", sourceObservable);
  }

  // Check if running under Rosetta emulation (Apple Silicon x86 emulation)
  if (isRunningUnderRosetta()) {
    // Notify that global libvips should NOT be used due to Rosetta
    return returnSourceWithOptionalNotice(false, "Rosetta", sourceObservable);
  }

  // Attempt to retrieve global libvips configuration
  const globalLibvipsConfig = getGlobalLibvipsConfig();

  // If configuration exists, validate isBlobOrFileLikeObject
  return !!globalLibvipsConfig && validateLibvipsConfig(globalLibvipsConfig, requiredLibvipsKeys);
}

module.exports = shouldUseGlobalLibvips;