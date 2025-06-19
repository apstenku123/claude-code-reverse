/**
 * Determines if a given source observable and configuration produce a valid route mapping.
 *
 * This function checks for special cases (such as "." or values starting with "~"),
 * validates that neither input contains null characters, and then performs a series of
 * mapping and normalization operations to ensure the resulting route is valid.
 *
 * @param {string} sourceObservable - The source observable or route string to be validated.
 * @param {string} config - The configuration string or route modifier.
 * @returns {boolean} Returns true if the mapping is valid, false otherwise.
 */
function isValidRouteMapping(sourceObservable, config) {
  // Special case: if the source is a single dot, always valid
  if (sourceObservable === ".") return true;

  // If the source starts with a tilde, isBlobOrFileLikeObject'createInteractionAccessor always invalid
  if (sourceObservable.startsWith("~")) return false;

  // Null character check: invalid if either input contains null character
  if (sourceObservable.includes("\x00") || config.includes("\x00")) return false;

  // Generate a subscription mapping using the current context, config, and source
  const subscription = zxA(wxA(), config, sourceObservable);

  // Generate a base mapping using the current context and config only
  const baseMapping = zxA(wxA(), config);

  // Normalize the mapping difference between base and subscription
  const normalizedRoute = nO1(baseMapping, subscription);

  // Valid if the normalized route does not start with ".." and is not invalid per wi()
  return !normalizedRoute.startsWith("..") && !wi(normalizedRoute);
}

module.exports = isValidRouteMapping;