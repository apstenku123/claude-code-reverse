/**
 * Factory function to create an object containing HTTP authentication configuration and credentials.
 *
 * @param {Object} authProvider - An object that provides methods to retrieve HTTP authentication schemes, scheme providers, and credentials.
 * @param {Function} authProvider.httpAuthSchemes - Method to retrieve available HTTP authentication schemes.
 * @param {Function} authProvider.httpAuthSchemeProvider - Method to retrieve the HTTP authentication scheme provider.
 * @param {Function} authProvider.credentials - Method to retrieve authentication credentials.
 * @returns {Object} An object containing httpAuthSchemes, httpAuthSchemeProvider, and credentials.
 */
const createHttpAuthData = (authProvider) => {
  return {
    // Retrieve available HTTP authentication schemes
    httpAuthSchemes: authProvider.httpAuthSchemes(),
    // Retrieve the HTTP authentication scheme provider
    httpAuthSchemeProvider: authProvider.httpAuthSchemeProvider(),
    // Retrieve authentication credentials
    credentials: authProvider.credentials()
  };
};

module.exports = createHttpAuthData;
