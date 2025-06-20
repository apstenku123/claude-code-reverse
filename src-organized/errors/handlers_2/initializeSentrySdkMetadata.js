/**
 * Adds or updates Sentry SDK metadata on the provided object if not already present.
 *
 * @param {Object} targetObject - The object to which Sentry SDK metadata will be attached (typically a client or hub instance).
 * @param {string} sdkNameSuffix - The suffix to append to the Sentry SDK name (e.g., 'node', 'browser').
 * @param {string[]} [packageNames=[sdkNameSuffix]] - An array of package name suffixes to include in the metadata packages list.
 * @param {string} [packageManager="npm"] - The package manager to use as a prefix in the package names.
 * @returns {void}
 *
 * @example
 * initializeSentrySdkMetadata(client, 'node', ['node', 'tracing'], 'yarn');
 */
function initializeSentrySdkMetadata(
  targetObject,
  sdkNameSuffix,
  packageNames = [sdkNameSuffix],
  packageManager = "npm"
) {
  // Retrieve existing metadata or initialize as an empty object
  const metadata = targetObject._metadata || {};

  // Only set the SDK metadata if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been set already
  if (!metadata.sdk) {
    metadata.sdk = {
      // Construct the full SDK name
      name: `sentry.javascript.${sdkNameSuffix}`,
      // Map each package name suffix to a full package object
      packages: packageNames.map(packageSuffix => ({
        name: `${packageManager}:@sentry/${packageSuffix}`,
        version: m3A.SDK_VERSION // Use the global SDK version
      })),
      version: m3A.SDK_VERSION
    };
  }

  // Attach the metadata back to the target object
  targetObject._metadata = metadata;
}

module.exports = initializeSentrySdkMetadata;