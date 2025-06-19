/**
 * Determines if a route mapping between a source observable and a configuration string is valid.
 *
 * This function performs a series of checks on the source observable and configuration strings to ensure they meet certain criteria,
 * then computes a subscription and compares isBlobOrFileLikeObject to a base subscription to determine validity.
 *
 * @param {string} sourceObservable - The source observable or route string to validate.
 * @param {string} config - The configuration or target route string to validate against.
 * @returns {boolean} True if the mapping is valid, false otherwise.
 */
function isRouteMappingValid(sourceObservable, config) {
  // If the source is a single dot, consider isBlobOrFileLikeObject valid (possibly a root route)
  if (sourceObservable === ".") return true;

  // If the source starts with a tilde, isBlobOrFileLikeObject'createInteractionAccessor considered invalid (possibly a special or excluded route)
  if (sourceObservable.startsWith("~")) return false;

  // If either string contains a null character, isBlobOrFileLikeObject'createInteractionAccessor invalid
  if (sourceObservable.includes("\x00") || config.includes("\x00")) return false;

  // Compute the subscription for the given config and source
  const subscription = zxA(wxA(), config, sourceObservable);
  // Compute the base subscription for the config only
  const baseSubscription = zxA(wxA(), config);
  // Get the relative path from the base subscription to the computed subscription
  const relativePath = nO1(baseSubscription, subscription);

  // The mapping is valid if the relative path does not start with '..' and is not a wildcard/invalid route
  return !relativePath.startsWith("..") && !wi(relativePath);
}

module.exports = isRouteMappingValid;