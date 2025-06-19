/**
 * Creates a secure SSL connection using the provided source, configuration, and subscription.
 *
 * @param {string} sourceObservable - The source observable or endpoint to establish the SSL connection with.
 * @param {object} config - Configuration options for the SSL connection.
 * @param {object} subscription - Subscription or context information for the SSL connection.
 * @returns {any} The result of the SSL connection creation process.
 */
function createSecureSslConnection(sourceObservable, config, subscription) {
  // Retrieve credentials from the current user session
  const { credentials } = us();

  // Use the credentials object to create an SSL connection
  return credentials.createSsl(sourceObservable, config, subscription);
}

module.exports = createSecureSslConnection;