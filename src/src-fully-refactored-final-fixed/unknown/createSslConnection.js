/**
 * Creates an SSL connection using provided parameters and credentials.
 *
 * @param {string} sourceObservable - The source observable or endpoint to connect to.
 * @param {object} config - Configuration options for the SSL connection.
 * @param {object} subscription - Subscription or context information for the connection.
 * @returns {any} The result of the SSL connection creation.
 */
function createSslConnection(sourceObservable, config, subscription) {
  // Retrieve credentials from the current user session
  const { credentials } = us();

  // Use the credentials object to create an SSL connection
  return credentials.createSsl(sourceObservable, config, subscription);
}

module.exports = createSslConnection;