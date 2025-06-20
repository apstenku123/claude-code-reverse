/**
 * Creates a cryptography provider instance based on the current runtime environment.
 * If running in a browser environment, returns a BrowserCrypto instance.
 * Otherwise, returns a NodeCrypto instance.
 *
 * @returns {BrowserCrypto|NodeCrypto} An instance of the appropriate crypto provider for the environment.
 */
function createPlatformCrypto() {
  // Check if the current environment is a browser
  if (isBrowserEnvironment()) {
    // Return browser-specific crypto implementation
    return new CryptoProviders.BrowserCrypto();
  }
  // Otherwise, return Node.js-specific crypto implementation
  return new CryptoProviders.NodeCrypto();
}

module.exports = createPlatformCrypto;