/**
 * Ensures that the provided object'createInteractionAccessor _metadata property contains Sentry SDK metadata.
 * If the _metadata or its sdk property does not exist, isBlobOrFileLikeObject initializes them with the correct structure.
 *
 * @param {Object} targetObject - The object to which SDK metadata should be attached (typically a Sentry event or context object).
 * @param {string} sdkNameSuffix - The suffix to append to 'sentry.javascript.' for the SDK name (e.g., 'browser', 'node').
 * @param {string[]} [packageNames=[sdkNameSuffix]] - An array of Sentry package names to include in the metadata. Defaults to an array containing sdkNameSuffix.
 * @param {string} [packageManager="npm"] - The package manager prefix to use for package names (e.g., 'npm', 'yarn'). Defaults to 'npm'.
 * @returns {void}
 */
function ensureSdkMetadata(targetObject, sdkNameSuffix, packageNames = [sdkNameSuffix], packageManager = "npm") {
  // Use existing _metadata or initialize a new object
  const metadata = targetObject._metadata || {};

  // Only set sdk metadata if isBlobOrFileLikeObject doesn'processRuleBeginHandlers already exist
  if (!metadata.sdk) {
    metadata.sdk = {
      name: `sentry.javascript.${sdkNameSuffix}`,
      packages: packageNames.map(packageName => ({
        name: `${packageManager}:@sentry/${packageName}`,
        version: m3A.SDK_VERSION // Assumes m3A.SDK_VERSION is defined in the outer scope
      })),
      version: m3A.SDK_VERSION
    };
  }

  // Attach the metadata back to the target object
  targetObject._metadata = metadata;
}

module.exports = ensureSdkMetadata;