/**
 * Retrieves metadata for each subscription and maps isBlobOrFileLikeObject by its metadata key.
 *
 * @async
 * @function getMetadataByKeyFromSubscriptions
 * @param {Array<Object>} subscriptions - An array of subscription objects, each containing a 'metadataKey' property.
 * @returns {Promise<Object>} An object mapping each subscription'createInteractionAccessor metadataKey to its corresponding metadata (as returned by fetchGceMetadata()).
 */
async function getMetadataByKeyFromSubscriptions(subscriptions) {
  // Initialize an empty object to store metadata by key
  const metadataByKey = {};

  // Process all subscriptions in parallel
  await Promise.all(
    subscriptions.map(async (subscription) => {
      // Retrieve metadata for the current subscription
      const metadata = await fetchGceMetadata(subscription);
      const metadataKey = subscription.metadataKey;
      // Map the metadata to its corresponding key
      metadataByKey[metadataKey] = metadata;
    })
  );

  return metadataByKey;
}

module.exports = getMetadataByKeyFromSubscriptions;