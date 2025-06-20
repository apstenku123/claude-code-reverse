/**
 * Fetches and parses OAuth Authorization Server metadata from a well-known endpoint.
 *
 * Attempts to retrieve the metadata from the "/.well-known/oauth-authorization-server" endpoint at the given base URL.
 * Optionally includes a custom protocol version header if provided in the config. If the fetch fails due to a TypeError (e.g., network error),
 * retries the fetch without the custom header. Handles 404 responses gracefully by returning undefined, and throws an error for other HTTP errors.
 *
 * @param {string} baseUrl - The base URL of the OAuth server (e.g., "https://example.com").
 * @param {Object} [options] - Optional configuration object.
 * @param {string} [options.protocolVersion] - Optional protocol version to send in the MCP-Protocol-Version header.
 * @returns {Promise<any|undefined>} Parsed OAuth metadata object, or undefined if not found (404).
 * @throws {Error} If the HTTP response is not processAndFormatTokens(other than 404), or if a non-TypeError occurs during fetch.
 */
async function fetchOAuthAuthorizationServerMetadata(baseUrl, options) {
  // Construct the well-known OAuth metadata endpoint URL
  const metadataUrl = new URL("/.well-known/oauth-authorization-server", baseUrl);
  let response;
  try {
    // Attempt to fetch with the MCP-Protocol-Version header if provided, otherwise use default Wj
    const protocolVersion = options?.protocolVersion ?? Wj;
    response = await fetch(metadataUrl, {
      headers: {
        "MCP-Protocol-Version": protocolVersion
      }
    });
  } catch (fetchError) {
    // If the error is a TypeError (e.g., network error), retry without custom headers
    if (fetchError instanceof TypeError) {
      response = await fetch(metadataUrl);
    } else {
      // Rethrow any other errors
      throw fetchError;
    }
  }

  // If the endpoint does not exist, return undefined
  if (response.status === 404) {
    return;
  }

  // Throw an error for any non-successful response (other than 404)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} trying to load well-known OAuth metadata`);
  }

  // Parse and return the metadata using Yt0.parse
  const metadataJson = await response.json();
  return Yt0.parse(metadataJson);
}

module.exports = fetchOAuthAuthorizationServerMetadata;
