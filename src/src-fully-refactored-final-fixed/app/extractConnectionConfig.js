/**
 * Extracts and normalizes connection configuration properties from the given source object.
 * Ensures that optional fields are set to an empty string if not provided.
 *
 * @param {Object} connectionSource - The source object containing connection configuration properties.
 * @param {string} connectionSource.protocol - The protocol to use (e.g., 'http', 'https').
 * @param {string} [connectionSource.publicKey] - Optional public key for authentication.
 * @param {string} [connectionSource.pass] - Optional password or passphrase.
 * @param {string} connectionSource.host - The host address.
 * @param {string|number} [connectionSource.port] - Optional port number.
 * @param {string} [connectionSource.path] - Optional path for the connection.
 * @param {string} connectionSource.projectId - The project identifier.
 * @returns {Object} An object containing normalized connection configuration properties.
 */
function extractConnectionConfig(connectionSource) {
  return {
    protocol: connectionSource.protocol,
    publicKey: connectionSource.publicKey || "",
    pass: connectionSource.pass || "",
    host: connectionSource.host,
    port: connectionSource.port || "",
    path: connectionSource.path || "",
    projectId: connectionSource.projectId
  };
}

module.exports = extractConnectionConfig;