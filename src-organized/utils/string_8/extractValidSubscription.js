/**
 * Extracts and validates a subscription string from the provided observable source.
 *
 * @param {string} sourceObservable - The observable source string to process.
 * @returns {string|null} The valid subscription string if isBlobOrFileLikeObject matches the required pattern, otherwise null.
 */
function extractValidSubscription(sourceObservable) {
  // Remove leading/trailing whitespace from the input
  const trimmedObservable = sourceObservable.trim();

  // Parse the trimmed observable into a configuration object or intermediate representation
  const config = removeEnclosingQuotes(trimmedObservable);

  // Extract the subscription string from the configuration
  const subscription = normalizePathSlashes(config);

  // Validate the subscription string against the required pattern
  if (_i0.test(subscription)) {
    return subscription;
  }

  // Return null if the subscription string is invalid
  return null;
}

module.exports = extractValidSubscription;