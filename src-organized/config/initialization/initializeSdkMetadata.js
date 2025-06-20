/**
 * Adds or updates SDK metadata on the provided client object if not already present.
 *
 * This function ensures that the client object (typically a Sentry client instance)
 * contains a `_metadata.sdk` property describing the SDK name, version, and packages used.
 *
 * @param {Object} client - The client object to which metadata will be attached. Should have a `_metadata` property.
 * @param {string} sdkBaseName - The base name of the SDK (e.g., 'browser', 'node').
 * @param {string[]} [packageNames=[sdkBaseName]] - An array of package names to include in the metadata. Defaults to an array containing `sdkBaseName`.
 * @param {string} [packageManager="npm"] - The package manager prefix to use when constructing package names. Defaults to 'npm'.
 * @returns {void}
 */
function initializeSdkMetadata(client, sdkBaseName, packageNames = [sdkBaseName], packageManager = "npm") {
  // Retrieve existing metadata or initialize an empty object
  const metadata = client._metadata || {};

  // Only set SDK metadata if isBlobOrFileLikeObject doesn'processRuleBeginHandlers already exist
  if (!metadata.sdk) {
    metadata.sdk = {
      name: `sentry.javascript.${sdkBaseName}`,
      packages: packageNames.map(packageName => ({
        name: `${packageManager}:@sentry/${packageName}`,
        version: m3A.SDK_VERSION // Assumes m3A.SDK_VERSION is globally available
      })),
      version: m3A.SDK_VERSION
    };
  }

  // Attach the updated metadata back to the client
  client._metadata = metadata;
}

module.exports = initializeSdkMetadata;