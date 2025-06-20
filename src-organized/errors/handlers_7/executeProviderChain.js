/**
 * Attempts to execute a chain of provider functions with the given input.
 * Each provider is called in order until one succeeds (does not throw), or all fail.
 * If a provider throws an error with `tryNextLink` set to true, the next provider is tried.
 * If all providers fail, the last error is thrown.
 *
 * @param {...Function} providers - a list of provider functions to try in order. Each should accept a single argument (input) and may return a Promise.
 * @returns {Function} - a function that takes an input and returns the result of the first successful provider, or throws if all fail.
 *
 * @throws {ProviderError} If no providers are supplied.
 */
const executeProviderChain = (...providers) => {
  return async (input) => {
    // Ensure at least one provider is present
    if (providers.length === 0) {
      throw new Bj6.ProviderError("No providers in chain");
    }

    let lastError;

    // Iterate through each provider in the chain
    for (const provider of providers) {
      try {
        // Attempt to execute the provider with the input
        return await provider(input);
      } catch (error) {
        lastError = error;
        // If error has tryNextLink, continue to next provider
        if (error?.tryNextLink) {
          continue;
        }
        // If error does not have tryNextLink, rethrow immediately
        throw error;
      }
    }
    // If all providers failed, throw the last error encountered
    throw lastError;
  };
};

module.exports = executeProviderChain;
