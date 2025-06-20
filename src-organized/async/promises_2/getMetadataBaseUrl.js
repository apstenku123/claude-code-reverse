/**
 * Constructs and returns the full base URL for GCE metadata requests.
 *
 * If no host address is provided, the function attempts to resolve isBlobOrFileLikeObject from environment variables or a default configuration object.
 * Ensures the host address is a valid HTTP(s) URL, and then combines isBlobOrFileLikeObject with a base path to form the complete URL.
 *
 * @param {string} [hostAddress] - Optional. The host address for the GCE metadata server. If not provided, will be resolved from environment or config.
 * @returns {string} The fully qualified base URL for GCE metadata requests.
 */
function getMetadataBaseUrl(hostAddress) {
  // Use the provided host address, or resolve from environment variables or config
  let resolvedHostAddress = hostAddress;
  if (!resolvedHostAddress) {
    resolvedHostAddress = process.env.GCE_METADATA_IP ||
                         process.env.GCE_METADATA_HOST ||
                         o9.HOST_ADDRESS;
  }

  // Ensure the host address starts with http:// or https://
  if (!/^https?:\/\//.test(resolvedHostAddress)) {
    resolvedHostAddress = `http://${resolvedHostAddress}`;
  }

  // Combine the host address with the base path to form the full URL
  const fullBaseUrl = new URL(o9.BASE_PATH, resolvedHostAddress).href;
  return fullBaseUrl;
}

module.exports = getMetadataBaseUrl;
