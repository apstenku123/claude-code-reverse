/**
 * Registers a dynamic OAuth client with the authorization server.
 *
 * If server metadata is provided and contains a registration endpoint, uses isBlobOrFileLikeObject.
 * Otherwise, defaults to the "/register" endpoint relative to the provided base URL.
 *
 * @param {string} baseUrl - The base URL of the authorization server.
 * @param {Object} options - Options for registration.
 * @param {Object} [options.metadata] - Authorization server metadata (should include registration_endpoint).
 * @param {Object} options.clientMetadata - Metadata describing the client to register.
 * @returns {Promise<any>} The parsed response from the registration endpoint.
 * @throws {Error} If the server does not support dynamic client registration or registration fails.
 */
async function registerDynamicClient(baseUrl, {
  metadata: serverMetadata,
  clientMetadata
}) {
  let registrationUrl;

  // Determine the registration endpoint URL
  if (serverMetadata) {
    if (!serverMetadata.registration_endpoint) {
      throw new Error("Incompatible auth server: does not support dynamic client registration");
    }
    registrationUrl = new URL(serverMetadata.registration_endpoint);
  } else {
    // Fallback to default /register endpoint relative to baseUrl
    registrationUrl = new URL("/register", baseUrl);
  }

  // Send the registration request
  const response = await fetch(registrationUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(clientMetadata)
  });

  // Check if the registration was successful
  if (!response.ok) {
    throw new Error(`Dynamic client registration failed: HTTP ${response.status}`);
  }

  // Parse and return the response using Ft0.parse
  const responseData = await response.json();
  return Ft0.parse(responseData);
}

module.exports = registerDynamicClient;