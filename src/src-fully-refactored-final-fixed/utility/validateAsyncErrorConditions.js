/**
 * Validates async error conditions based on provided interactions, configuration, and subscription.
 * Throws errors if certain thresholds are exceeded.
 *
 * @param {Array} interactionEntries - Array of user interaction entries to be processed.
 * @param {Object} config - Configuration object used for validation and lookup.
 * @param {Object} subscription - Subscription or context object passed to downstream async validation.
 * @throws {Error} Throws error if interaction count or async validation exceeds allowed thresholds.
 */
async function validateAsyncErrorConditions(interactionEntries, config, subscription) {
  // If config is not in the cache and the number of interactions exceeds the limit, throw an error
  if (!cV1.has(config) && interactionEntries.length > lV1) {
    throw new Error(Fo1(interactionEntries.length));
  }

  // Calculate one fourth of the interaction entries length
  const quarterLength = getQuarterLength(interactionEntries);

  // If quarterLength exists and is greater than a quarter of the allowed threshold
  if (quarterLength && quarterLength > ye / 4) {
    // Perform an async validation on the interaction entries
    const asyncValidationResult = await sendUserMessage(interactionEntries, subscription);
    // If the async validation result exists and exceeds the allowed threshold, throw an error
    if (asyncValidationResult && asyncValidationResult > ye) {
      throw new Error(getFileContentTokenLimitMessage(asyncValidationResult));
    }
  }
}

module.exports = validateAsyncErrorConditions;