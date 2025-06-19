/**
 * Factory function to create an HTTP authentication configuration object.
 *
 * This function extracts HTTP authentication schemes, the authentication scheme provider,
 * and credentials from the provided source object, and returns them in a structured config object.
 *
 * @param {Object} authSource - An object providing methods to retrieve HTTP authentication details.
 * @param {Function} authSource.httpAuthSchemes - Method to retrieve supported HTTP authentication schemes.
 * @param {Function} authSource.httpAuthSchemeProvider - Method to retrieve the HTTP authentication scheme provider.
 * @param {Function} authSource.credentials - Method to retrieve authentication credentials.
 * @returns {Object} An object containing httpAuthSchemes, httpAuthSchemeProvider, and credentials.
 */
const createHttpAuthConfig = (authSource) => {
  return {
    // Retrieve supported HTTP authentication schemes
    httpAuthSchemes: authSource.httpAuthSchemes(),
    // Retrieve the HTTP authentication scheme provider
    httpAuthSchemeProvider: authSource.httpAuthSchemeProvider(),
    // Retrieve authentication credentials
    credentials: authSource.credentials()
  };
};

module.exports = createHttpAuthConfig;
