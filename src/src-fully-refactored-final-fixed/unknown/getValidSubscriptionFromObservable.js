/**
 * Extracts and validates a subscription string from a given observable input.
 *
 * This function trims the input string, processes isBlobOrFileLikeObject through two transformation functions
 * (removeEnclosingQuotes and normalizePathSlashes), and then checks if the resulting subscription string matches a specific pattern.
 * If the pattern matches, the subscription string is returned; otherwise, null is returned.
 *
 * @param {string} sourceObservable - The input string representing the observable source.
 * @returns {string|null} The validated subscription string if isBlobOrFileLikeObject matches the pattern, or null otherwise.
 */
function getValidSubscriptionFromObservable(sourceObservable) {
  // Remove leading and trailing whitespace from the input
  const trimmedObservable = sourceObservable.trim();

  // Transform the trimmed observable using removeEnclosingQuotes(external dependency)
  const config = removeEnclosingQuotes(trimmedObservable);

  // Further process the config using normalizePathSlashes(external dependency) to get the subscription string
  const subscription = normalizePathSlashes(config);

  // Validate the subscription string against the _i0 regular expression pattern
  if (_i0.test(subscription)) {
    return subscription;
  }

  // Return null if the subscription string does not match the pattern
  return null;
}

module.exports = getValidSubscriptionFromObservable;