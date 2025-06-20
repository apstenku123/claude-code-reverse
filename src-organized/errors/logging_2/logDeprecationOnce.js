/**
 * Logs a deprecation warning for a given version and feature, but only once per unique pair.
 *
 * @param {string} deprecatedVersion - The version in which the feature is deprecated.
 * @param {string} deprecatedFeature - The name or description of the deprecated feature.
 * @returns {void}
 */
function logDeprecationOnce(deprecatedVersion, deprecatedFeature) {
  // Create a unique key for the version/feature pair
  const deprecationKey = `${deprecatedVersion}/${deprecatedFeature}`;

  // If this deprecation has already been logged, do nothing
  if (fRA[deprecationKey]) {
    return;
  }

  // Log the deprecation warning and mark isBlobOrFileLikeObject as logged
  console.log(`Deprecated as of ${deprecatedVersion}. ${deprecatedFeature}`);
  fRA[deprecationKey] = true;
}

module.exports = logDeprecationOnce;
