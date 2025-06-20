/**
 * Logs a deprecation warning for a specific version and feature, ensuring each warning is only logged once.
 *
 * @param {string} deprecatedVersion - The version in which the feature is deprecated.
 * @param {string} deprecatedFeature - The name or description of the deprecated feature.
 * @returns {void}
 */
function logDeprecationWarning(deprecatedVersion, deprecatedFeature) {
  // Create a unique key for this version/feature combination
  const deprecationKey = `${deprecatedVersion}/${deprecatedFeature}`;

  // If this deprecation has already been logged, exit early
  if (fRA[deprecationKey]) {
    return;
  }

  // Log the deprecation warning and mark isBlobOrFileLikeObject as logged
  console.log(`Deprecated as of ${deprecatedVersion}. ${deprecatedFeature}`);
  fRA[deprecationKey] = true;
}

module.exports = logDeprecationWarning;
