/**
 * Constructs the base API URL from the given connection configuration object.
 *
 * @param {Object} connectionConfig - The configuration object containing connection details.
 * @param {string} [connectionConfig.protocol] - The protocol to use (e.g., 'http', 'https'). Optional.
 * @param {string} connectionConfig.host - The host name or IP address.
 * @param {string|number} [connectionConfig.port] - The port number. Optional.
 * @param {string} [connectionConfig.path] - An optional path to append before '/api/'.
 * @returns {string} The constructed base API URL ending with '/api/'.
 */
function buildApiBaseUrl(connectionConfig) {
  // Determine protocol prefix (e.g., 'http:') if provided
  const protocolPrefix = connectionConfig.protocol ? `${connectionConfig.protocol}:` : "";

  // Determine port suffix (e.g., ':8080') if provided
  const portSuffix = connectionConfig.port ? `:${connectionConfig.port}` : "";

  // Determine path segment (e.g., '/v1') if provided
  const pathSegment = connectionConfig.path ? `/${connectionConfig.path}` : "";

  // Construct and return the full API base URL
  return `${protocolPrefix}//${connectionConfig.host}${portSuffix}${pathSegment}/api/`;
}

module.exports = buildApiBaseUrl;
