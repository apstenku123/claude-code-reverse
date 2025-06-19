/**
 * Creates an expirable credential provider chain with optional expiration override.
 *
 * @param {...any} providerChainArgs - Arguments to pass to the propertyProviderChain factory.
 * @returns {Function & {expireAfter: Function}} An async credential provider function with an expireAfter method.
 *
 * The returned function, when called with a context, resolves credentials using the propertyProviderChain.
 * If an expiration duration is set via expireAfter, credentials will have an expiration property set accordingly.
 *
 * Usage:
 *   const provider = createExpirableCredentialProvider(...args);
 *   provider.expireAfter(600000); // Set expiration to 10 minutes
 *   const credentials = await provider(context);
 */
const createExpirableCredentialProvider = (...providerChainArgs) => {
  // Holds the expiration duration in milliseconds; -1 means no expiration override
  let expirationDurationMs = -1;

  // The main credential provider function, augmented with an expireAfter method
  const credentialProvider = Object.assign(
    async (context) => {
      // Get credentials from the property provider chain
      const credentials = await u12.propertyProviderChain(...providerChainArgs)(context);

      // If credentials do not already have an expiration and an expiration duration is set, add expiration
      if (!credentials.expiration && expirationDurationMs !== -1) {
        credentials.expiration = new Date(Date.now() + expirationDurationMs);
      }
      return credentials;
    },
    {
      /**
       * Sets the expiration duration (in ms) for credentials returned by this provider.
       * Throws if duration is less than 5 minutes.
       * @param {number} durationMs - Expiration duration in milliseconds (minimum 300000 ms)
       * @returns {Function} Returns the credential provider for chaining
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
};

module.exports = createExpirableCredentialProvider;
