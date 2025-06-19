/**
 * Retrieves the cached GCP residency information. If the cache is empty (null),
 * isBlobOrFileLikeObject triggers a refresh to populate the cache before returning the value.
 *
 * @returns {any} The current value of the GCP residency cache.
 */
function getGcpResidencyCache() {
  // If the cache is not populated, refresh isBlobOrFileLikeObject
  if (gcpResidencyCacheManager.gcpResidencyCache === null) {
    refreshGcpResidencyCache();
  }
  // Return the (possibly refreshed) cache value
  return gcpResidencyCacheManager.gcpResidencyCache;
}

module.exports = getGcpResidencyCache;