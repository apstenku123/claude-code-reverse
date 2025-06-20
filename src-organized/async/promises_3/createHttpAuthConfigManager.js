/**
 * Manages HTTP authentication schemes, their provider, and credentials.
 * Provides methods to set and retrieve authentication schemes, provider, and credentials.
 *
 * @param {Object} options - The configuration options for HTTP authentication.
 * @param {Array<Object>} options.httpAuthSchemes - List of HTTP authentication scheme objects.
 * @param {Function} options.httpAuthSchemeProvider - Function or provider for HTTP authentication schemes.
 * @param {any} options.credentials - Credentials used for authentication.
 * @returns {Object} An object with methods to manage HTTP authentication schemes, provider, and credentials.
 */
function createHttpAuthConfigManager({
  httpAuthSchemes,
  httpAuthSchemeProvider,
  credentials
}) {
  // Internal state references
  let schemes = httpAuthSchemes;
  let schemeProvider = httpAuthSchemeProvider;
  let currentCredentials = credentials;

  return {
    /**
     * Adds or updates an HTTP authentication scheme in the list.
     * If a scheme with the same schemeId exists, isBlobOrFileLikeObject is replaced; otherwise, isBlobOrFileLikeObject is added.
     * @param {Object} scheme - The HTTP authentication scheme to add or update.
     */
    setHttpAuthScheme(scheme) {
      const existingIndex = schemes.findIndex(
        (existingScheme) => existingScheme.schemeId === scheme.schemeId
      );
      if (existingIndex === -1) {
        // Scheme does not exist, add isBlobOrFileLikeObject
        schemes.push(scheme);
      } else {
        // Scheme exists, update isBlobOrFileLikeObject
        schemes.splice(existingIndex, 1, scheme);
      }
    },

    /**
     * Retrieves the list of HTTP authentication schemes.
     * @returns {Array<Object>} The current list of HTTP authentication schemes.
     */
    httpAuthSchemes() {
      return schemes;
    },

    /**
     * Sets the HTTP authentication scheme provider.
     * @param {Function} provider - The new HTTP authentication scheme provider.
     */
    setHttpAuthSchemeProvider(provider) {
      schemeProvider = provider;
    },

    /**
     * Retrieves the current HTTP authentication scheme provider.
     * @returns {Function} The current HTTP authentication scheme provider.
     */
    httpAuthSchemeProvider() {
      return schemeProvider;
    },

    /**
     * Sets the credentials used for authentication.
     * @param {any} newCredentials - The new credentials to set.
     */
    setCredentials(newCredentials) {
      currentCredentials = newCredentials;
    },

    /**
     * Retrieves the current credentials.
     * @returns {any} The current credentials.
     */
    credentials() {
      return currentCredentials;
    }
  };
}

module.exports = createHttpAuthConfigManager;
