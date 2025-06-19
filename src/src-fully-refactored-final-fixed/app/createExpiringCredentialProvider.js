/**
 * Creates an async credential provider function with optional expiration logic.
 *
 * The returned function fetches credentials using the AWS property provider chain, and can be configured
 * to set an expiration time on the credentials. The expiration duration can be set via the `.expireAfter(ms)` method.
 *
 * @param {...any} providerChainArgs - Arguments to be passed to the property provider chain.
 * @returns {Function} An async credential provider function with an attached `.expireAfter(ms)` method.
 */
function createExpiringCredentialProvider(...providerChainArgs) {
  // Duration in milliseconds after which credentials should expire; -1 means no expiration is set
  let expirationDurationMs = -1;

  // The main credential provider function
  const credentialProvider = Object.assign(
    async (context) => {
      // Fetch credentials using the provided property provider chain
      const credentials = await u12.propertyProviderChain(...providerChainArgs)(context);

      // If credentials do not already have an expiration and expirationDurationMs is set, add expiration
      if (!credentials.expiration && expirationDurationMs !== -1) {
        credentials.expiration = new Date(Date.now() + expirationDurationMs);
      }
      return credentials;
    },
    {
      /**
       * Sets the expiration duration (in ms) for credentials returned by this provider.
       * Throws if duration is less than 5 minutes (300,000 ms).
       * @param {number} durationMs - Expiration duration in milliseconds (must be >= 300000)
       * @returns {Function} The credential provider function (for chaining)
       */
      expireAfter(durationMs) {
        if (durationMs < 300000) {
          throw new Error("@aws-sdk/credential-providers - createCredentialChain(...).expireAfter(ms) may not be called with a duration lower than five minutes.");
        }
        expirationDurationMs = durationMs;
        return credentialProvider;
      }
    }
  );

  return credentialProvider;
}

module.exports = createExpiringCredentialProvider;