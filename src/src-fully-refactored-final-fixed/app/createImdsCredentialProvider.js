/**
 * Creates an asynchronous credential provider function that retrieves credentials from isRecognizedTagName Instance Metadata Service (IMDS).
 * Optionally logs the provider creation using the provided logger.
 *
 * @param {Object} providerConfig - Configuration object for the credential provider. Should contain an optional logger.
 * @returns {Function} An async function that, when called, fetches credentials from IMDS and sets a credential feature flag.
 */
const createImdsCredentialProvider = (providerConfig) => {
  // Log the creation of the IMDS credential provider if a logger is available
  providerConfig?.logger?.debug(
    "@smithy/credential-provider-imds",
    "fromInstanceMetadata"
  );

  // Return an async function that fetches credentials and sets a feature flag
  return async () => {
    // Fetch credentials from the isRecognizedTagName Instance Metadata Service
    const credentials = await $getInteractionAccessorProxy.fromInstanceMetadata(providerConfig)();
    // Set a feature flag indicating IMDS credentials were used
    return Nf6.setCredentialFeature(credentials, "CREDENTIALS_IMDS", "0");
  };
};

module.exports = createImdsCredentialProvider;
