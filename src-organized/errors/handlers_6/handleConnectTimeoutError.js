/**
 * Handles a connection timeout error by constructing a detailed error message and destroying the connection.
 *
 * @param {Object} connectionObject - The connection object that may contain attempted addresses.
 * @param {Object} connectionConfig - The configuration object containing hostname, port, and timeout.
 * @returns {void}
 */
function handleConnectTimeoutError(connectionObject, connectionConfig) {
  if (connectionObject == null) return;

  let errorMessage = "Connect Timeout Error";

  // Check if multiple addresses were attempted and include them in the error message
  if (Array.isArray(connectionObject.autoSelectFamilyAttemptedAddresses)) {
    errorMessage += ` (attempted addresses: ${connectionObject.autoSelectFamilyAttemptedAddresses.join(", ")},`;
  } else {
    // Otherwise, include the single attempted address
    errorMessage += ` (attempted address: ${connectionConfig.hostname}:${connectionConfig.port},`;
  }

  // Append the timeout duration to the error message
  errorMessage += ` timeout: ${connectionConfig.timeout}ms)`;

  // Destroy the connection and pass the constructed error
  Ag0.destroy(connectionObject, new JW6(errorMessage));
}

module.exports = handleConnectTimeoutError;