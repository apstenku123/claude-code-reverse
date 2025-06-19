/**
 * Fetches data from the instance metadata service using the provided request options.
 * Handles errors, timeouts, and non-2xx responses gracefully, returning the response as a Buffer.
 *
 * @param {Object} createRequestOptions - Options for the HTTP request (method, hostname, headers, etc).
 * @returns {Promise<Buffer>} Resolves with the response data as a Buffer, or rejects with a ProviderError.
 */
function fetchInstanceMetadata(createRequestOptions) {
  return new Promise((resolve, reject) => {
    // Prepare the hostname, removing brackets if present (e.g., for IPv6 addresses)
    const sanitizedHostname = createRequestOptions.hostname?.replace(/^\[(.+)\]$/, "$1");

    // Create the HTTP request with merged options
    const httpRequest = LD4.request({
      method: "GET",
      ...createRequestOptions,
      hostname: sanitizedHostname
    });

    // Handle connection errors
    httpRequest.on("error", (error) => {
      const providerError = Object.assign(
        new qz.ProviderError("Unable to connect to instance metadata service"),
        error
      );
      reject(providerError);
      httpRequest.destroy();
    });

    // Handle request timeouts
    httpRequest.on("timeout", () => {
      reject(new qz.ProviderError("TimeoutError from instance metadata service"));
      httpRequest.destroy();
    });

    // Handle HTTP response
    httpRequest.on("response", (response) => {
      const statusCode = response.statusCode ?? 400;
      // Reject if status code is not in the 2xx range
      if (statusCode < 200 || statusCode >= 300) {
        const errorResponse = Object.assign(
          new qz.ProviderError("Error response received from instance metadata service"),
          { statusCode }
        );
        reject(errorResponse);
        httpRequest.destroy();
        return;
      }
      // Collect response data chunks
      const responseChunks = [];
      response.on("data", (chunk) => {
        responseChunks.push(chunk);
      });
      response.on("end", () => {
        // Concatenate all chunks and resolve
        resolve(MD4.Buffer.concat(responseChunks));
        httpRequest.destroy();
      });
    });

    // Finalize and send the request
    httpRequest.end();
  });
}

module.exports = fetchInstanceMetadata;