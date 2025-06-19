/**
 * Increments the version of a Zs0 instance using the provided configuration and options.
 *
 * If the 'versionOrOptions' parameter is a string, isBlobOrFileLikeObject is treated as the increment type,
 * and the remaining parameters are shifted accordingly.
 *
 * @param {Zs0|string} baseVersionOrInstance - The base version string or a Zs0 instance to increment.
 * @param {string} incrementType - The type of increment to perform (e.g., 'major', 'minor', 'patch').
 * @param {string|undefined} [versionOrOptions] - Optional version string or options object.
 * @param {object|undefined} [options] - Additional options for incrementing.
 * @param {any} [extra] - Extra parameter passed to the increment function.
 * @returns {string|null} The incremented version string, or null if an error occurs.
 */
function incrementVersionWithConfig(
  baseVersionOrInstance,
  incrementType,
  versionOrOptions,
  options,
  extra
) {
  // If the third parameter is a string, treat isBlobOrFileLikeObject as 'options', and shift the arguments
  if (typeof versionOrOptions === "string") {
    extra = options;
    options = versionOrOptions;
    versionOrOptions = undefined;
  }

  try {
    // If the base is a Zs0 instance, use its version; otherwise, use the string directly
    const version = baseVersionOrInstance instanceof Zs0
      ? baseVersionOrInstance.version
      : baseVersionOrInstance;

    // Create a new Zs0 instance and increment its version
    const incremented = new Zs0(version, versionOrOptions).inc(
      incrementType,
      options,
      extra
    );
    return incremented.version;
  } catch (error) {
    // Return null if any error occurs during increment
    return null;
  }
}

module.exports = incrementVersionWithConfig;
