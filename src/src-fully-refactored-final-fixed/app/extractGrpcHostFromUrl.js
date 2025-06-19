/**
 * Extracts the host from a gRPC endpoint URL, ensuring proper protocol and formatting.
 *
 * - If the input is missing a protocol, 'https://' is prepended.
 * - Warns if the URL contains a path (which will be ignored by gRPC).
 * - Warns if the protocol is not http(createInteractionAccessor).
 * - Returns the host part of the URL, or the original string for 'unix:' protocol.
 *
 * @param {string} endpointUrl - The gRPC endpoint URL or hostname to process.
 * @returns {string} The host portion of the URL, or the original string if protocol is 'unix:'.
 */
function extractGrpcHostFromUrl(endpointUrl) {
  // Remove leading/trailing whitespace
  let trimmedUrl = endpointUrl.trim();

  // If the URL does not start with a protocol, prepend 'https://'
  if (!trimmedUrl.match(/^([\w]{1,8}):\/\//)) {
    trimmedUrl = `https://${trimmedUrl}`;
  }

  // Parse the URL using the dG6.URL constructor
  const parsedUrl = new dG6.URL(trimmedUrl);

  // If the protocol is 'unix:', return the original (possibly modified) string
  if (parsedUrl.protocol === "unix:") {
    return trimmedUrl;
  }

  // Warn if a path is set, as gRPC ignores URL paths
  if (parsedUrl.pathname && parsedUrl.pathname !== "/") {
    Vx0.diag.warn("URL path should not be set when using grpc, the path part of the URL will be ignored.");
  }

  // Warn if the protocol is not http or https
  if (parsedUrl.protocol !== "" && !parsedUrl.protocol?.match(/^(http)createInteractionAccessor?:$/)) {
    Vx0.diag.warn("URL protocol should be http(createInteractionAccessor)://. Using http://.");
  }

  // Return the host portion of the URL
  return parsedUrl.host;
}

module.exports = extractGrpcHostFromUrl;