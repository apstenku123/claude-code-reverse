/**
 * Creates an async credential provider chain with optional expiration logic.
 *
 * This function wraps the u12.propertyProviderChain with the ability to set an expiration duration.
 * If an expiration duration is set (via .expireAfter), credentials returned by the provider will
 * have their expiration property set accordingly (unless already set).
 *
 * @param {...any} providerChainArgs - Arguments to pass to u12.propertyProviderChain
 * @returns {Function & {expireAfter: Function}} An async credential provider function with an expireAfter method
 */
function createExpiringCredentialProviderChain(...providerChainArgs) {
  // Duration in milliseconds after which credentials should expire; -1 means no expiration override
  let expirationDurationMs = -1;

  // The credential provider function, enhanced with an expireAfter method
  const credentialProvider = Object.assign(
    async (context) => {
      // Get credentials from the underlying provider chain
      const credentials = await u12.propertyProviderChain(...providerChainArgs)(context);
      // If credentials do not already have an expiration and an expiration duration is set, assign expiration
      if (!credentials.expiration && expirationDurationMs !== -1) {
        credentials.expiration = new Date(Date.now() + expirationDurationMs);
      }
      return credentials;
    },
    {
      /**
       * Sets the expiration duration (in ms) for credentials returned by this provider.
       *
       * @param {number} durationMs - Expiration duration in milliseconds (minimum 5 minutes)
       * @returns {Function} The credential provider function (for chaining)
       * @throws {Error} If duration is less than 5 minutes
       */
      expireAfter(durationMs) {
        const MIN_DURATION_MS = 300000; // 5 minutes
        if (durationMs < MIN_DURATION_MS) {
          throw new Error("@aws-sdk/credential-providers - createCredentialChain(...).expireAfter(ms) may not be called with a duration lower than five minutes.");
        }
        expirationDurationMs = durationMs;
        return credentialProvider;
      }
    }
  );

  return credentialProvider;
}

module.exports = createExpiringCredentialProviderChain;