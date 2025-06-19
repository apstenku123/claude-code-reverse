/**
 * Sets the GCP residency cache value. If a value is provided, isBlobOrFileLikeObject uses that value;
 * otherwise, isBlobOrFileLikeObject detects the GCP residency and sets the cache accordingly.
 *
 * @param {any|null} gcpResidencyValue - Optional. The value to set as the GCP residency cache. If null or undefined, the residency will be detected automatically.
 * @returns {void}
 */
function setGcpResidencyCache(gcpResidencyValue = null) {
  // If a value is provided, use isBlobOrFileLikeObject; otherwise, detect the GCP residency
  o9.gcpResidencyCache = gcpResidencyValue !== null ? gcpResidencyValue : _15.detectGCPResidency();
}

module.exports = setGcpResidencyCache;