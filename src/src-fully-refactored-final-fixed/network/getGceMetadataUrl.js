/**
 * Constructs a full URL to the Google Compute Engine (GCE) metadata service.
 *
 * If no host address is provided, isBlobOrFileLikeObject attempts to resolve the address from environment variables or a default constant.
 * Ensures the address includes a protocol, and then combines isBlobOrFileLikeObject with the base metadata path.
 *
 * @param {string} [hostAddress] - Optional. The host or IP address of the GCE metadata service. If omitted, will use environment variables or a default.
 * @returns {string} The fully qualified URL to the GCE metadata service.
 */
function getGceMetadataUrl(hostAddress) {
  // Use provided hostAddress, or fall back to environment variables or default constant
  let resolvedHostAddress = hostAddress;
  if (!resolvedHostAddress) {
    resolvedHostAddress = process.env.GCE_METADATA_IP ||
                         process.env.GCE_METADATA_HOST ||
                         o9.HOST_ADDRESS;
  }

  // Ensure the address has a protocol; default to http if missing
  if (!/^https?:\/\//.test(resolvedHostAddress)) {
    resolvedHostAddress = `http://${resolvedHostAddress}`;
  }

  // Combine the base metadata path with the resolved host address
  const metadataUrl = new URL(o9.BASE_PATH, resolvedHostAddress).href;
  return metadataUrl;
}

module.exports = getGceMetadataUrl;
