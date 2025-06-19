/**
 * Validates the number of interaction entries and their token limits before processing.
 * Throws descriptive errors if the limits are exceeded.
 *
 * @param {string} interactionEntriesEncoded - Encoded string of interaction entries.
 * @param {object} config - Configuration object, used to check for existing entries in the cache.
 * @param {object} subscription - Subscription or context object, passed to downstream processing.
 * @throws {Error} If the number of interaction entries or their token count exceeds allowed limits.
 */
async function validateInteractionEntriesLimit(interactionEntriesEncoded, config, subscription) {
  // If config is not already in the cache and entries exceed the allowed limit, throw an error
  if (!cV1.has(config) && interactionEntriesEncoded.length > lV1) {
    throw new Error(Fo1(interactionEntriesEncoded.length));
  }

  // Calculate the number of interaction entries in the encoded string
  const entryCount = getInteractionEntryCount(interactionEntriesEncoded);

  // If there are entries and the count exceeds a quarter of the allowed token limit, check further
  if (entryCount && entryCount > ye / 4) {
    // Asynchronously get the token count for the entries
    const tokenCount = await sendUserMessage(interactionEntriesEncoded, subscription);
    // If the token count exceeds the allowed limit, throw an error
    if (tokenCount && tokenCount > ye) {
      throw new Error(getFileContentTokenLimitMessage(tokenCount));
    }
  }
}

module.exports = validateInteractionEntriesLimit;