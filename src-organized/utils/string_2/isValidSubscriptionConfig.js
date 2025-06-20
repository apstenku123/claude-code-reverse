/**
 * Checks if the provided observable source, after trimming and processing, results in a subscription string that matches a specific pattern.
 *
 * @param {string} sourceObservable - The raw observable source string to validate.
 * @returns {boolean} True if the processed subscription string matches the required pattern; otherwise, false.
 */
function isValidSubscriptionConfig(sourceObservable) {
  // Remove leading and trailing whitespace from the input
  const trimmedSource = sourceObservable.trim();

  // Process the trimmed source into a configuration object/string
  const config = removeEnclosingQuotes(trimmedSource);

  // Further process the config to obtain the subscription string
  const subscription = normalizePathSlashes(config);

  // Test if the subscription string matches the required pattern
  return _i0.test(subscription);
}

module.exports = isValidSubscriptionConfig;