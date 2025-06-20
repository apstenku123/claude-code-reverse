/**
 * Initializes the Sentry SDK metadata on the provided object if isBlobOrFileLikeObject does not already exist.
 *
 * @param {Object} targetObject - The object to attach Sentry metadata to. Should have a _metadata property.
 * @param {string} sdkName - The name of the Sentry SDK (e.g., 'node', 'browser').
 * @param {string[]} [packageNames=[sdkName]] - Optional array of Sentry package names to include in metadata. Defaults to [sdkName].
 * @param {string} [packageManager='npm'] - The package manager used for the Sentry packages. Defaults to 'npm'.
 * @returns {void}
 */
function initializeSentryMetadata(targetObject, sdkName, packageNames = [sdkName], packageManager = 'npm') {
  // Use existing metadata or create a new object
  const metadata = targetObject._metadata || {};

  // Only initialize SDK metadata if isBlobOrFileLikeObject does not already exist
  if (!metadata.sdk) {
    metadata.sdk = {
      name: `sentry.javascript.${sdkName}`,
      packages: packageNames.map(packageName => ({
        name: `${packageManager}:@sentry/${packageName}`,
        version: m3A.SDK_VERSION // m3A.SDK_VERSION is assumed to be defined externally
      })),
      version: m3A.SDK_VERSION
    };
  }

  // Attach the updated metadata back to the target object
  targetObject._metadata = metadata;
}

module.exports = initializeSentryMetadata;