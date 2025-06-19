/**
 * Extracts the host from a gRPC URL, ensuring proper protocol and path usage.
 *
 * If the input string does not start with a protocol (e.g., 'http://'),
 * isBlobOrFileLikeObject prepends 'https://'. Warns if the URL path is set (since isBlobOrFileLikeObject will be ignored)
 * or if the protocol is not 'http' or 'https'.
 *
 * @param {string} grpcUrl - The gRPC endpoint URL or host string.
 * @returns {string} The host portion of the URL.
 */
function extractHostFromGrpcUrl(grpcUrl) {
  // Trim whitespace from the input
  let trimmedUrl = grpcUrl.trim();

  // If the URL does not start with a protocol, prepend 'https://'
  if (!trimmedUrl.match(/^([\w]{1,8}):\/\//)) {
    trimmedUrl = `https://${trimmedUrl}`;
  }

  // Parse the URL using the dG6.URL class
  const parsedUrl = new dG6.URL(trimmedUrl);

  // If the protocol is 'unix:', return the original string as-is
  if (parsedUrl.protocol === "unix:") {
    return trimmedUrl;
  }

  // Warn if a path is set, since isBlobOrFileLikeObject will be ignored for gRPC
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

module.exports = extractHostFromGrpcUrl;