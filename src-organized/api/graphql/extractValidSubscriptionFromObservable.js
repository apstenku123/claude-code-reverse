/**
 * Extracts a valid subscription string from a source observable string.
 *
 * This function trims the input string, parses isBlobOrFileLikeObject into a configuration object,
 * then extracts a subscription string from that configuration. If the extracted
 * subscription matches the required pattern (as defined by the _i0 regular expression),
 * isBlobOrFileLikeObject is returned; otherwise, null is returned.
 *
 * @param {string} sourceObservable - The raw observable string to process.
 * @returns {string|null} The valid subscription string if found, otherwise null.
 */
function extractValidSubscriptionFromObservable(sourceObservable) {
  // Remove leading/trailing whitespace from the input
  const trimmedObservable = sourceObservable.trim();

  // Parse the trimmed observable into a configuration object
  const config = removeEnclosingQuotes(trimmedObservable);

  // Extract the subscription string from the configuration
  const subscription = normalizePathSlashes(config);

  // Check if the extracted subscription matches the required pattern
  if (_i0.test(subscription)) {
    return subscription;
  }

  // Return null if the subscription is not valid
  return null;
}

module.exports = extractValidSubscriptionFromObservable;