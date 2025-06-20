/**
 * Processes a user subscription with security checks and formatting.
 *
 * This function takes a source observable and a configuration object, slices the source string
 * according to custom logic, ensures the last entry is not a user type (adding a placeholder if needed),
 * and applies security processing to each entry. Returns the processed subscription array.
 *
 * @param {string} sourceObservable - The source string or observable to process.
 * @param {object} config - Configuration object used for security processing.
 * @returns {Array<object>} The processed subscription array with security formatting applied.
 * @throws Will rethrow any errors encountered during processing after logging them.
 */
function processUserSubscriptionWithSecurity(sourceObservable, config) {
  try {
    // Slice the source observable using custom logic
    const subscription = getSlicedStringByCustomLength(sourceObservable);

    // If the last entry is of type 'user', append a formatted placeholder
    if (subscription[subscription.length - 1]?.type === "user") {
      subscription.push(formatContentWithUsage({ content: le }));
    }

    // Create a map to track processed entries (used by security processor)
    const processedEntriesMap = new Map();

    // Apply security processing to each entry in the subscription
    for (const entry of subscription) {
      mapToolUsesToHandlers(config, processedEntriesMap, entry);
    }

    return subscription;
  } catch (error) {
    // Log the error using reportErrorIfAllowed and rethrow
    reportErrorIfAllowed(error);
    throw error;
  }
}

module.exports = processUserSubscriptionWithSecurity;
