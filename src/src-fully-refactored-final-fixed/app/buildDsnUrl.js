/**
 * Constructs a DSN (Data Source Name) URL from the provided configuration object.
 *
 * @param {Object} dsnConfig - The configuration object containing DSN components.
 * @param {string} dsnConfig.host - The host of the DSN (e.g., 'sentry.io').
 * @param {string} dsnConfig.path - The path segment for the DSN (may be empty or undefined).
 * @param {string} dsnConfig.pass - The password or secret for the DSN (optional).
 * @param {number|string} dsnConfig.port - The port number for the DSN (optional).
 * @param {string} dsnConfig.projectId - The project updateSnapshotAndNotify for the DSN.
 * @param {string} dsnConfig.protocol - The protocol to use (e.g., 'https').
 * @param {string} dsnConfig.publicKey - The public key for the DSN.
 * @param {boolean} [includePassword=false] - Whether to include the password in the URL if present.
 * @returns {string} The constructed DSN URL string.
 */
function buildDsnUrl(dsnConfig, includePassword = false) {
  const {
    host,
    path,
    pass: password,
    port,
    projectId,
    protocol,
    publicKey
  } = dsnConfig;

  // Build the password segment if requested and present
  const passwordSegment = includePassword && password ? `:${password}` : "";
  // Build the port segment if present
  const portSegment = port ? `:${port}` : "";
  // Build the path segment, ensuring trailing slash if path exists
  const pathSegment = path ? `${path}/` : path;

  // Construct and return the DSN URL
  return `${protocol}://${publicKey}${passwordSegment}@${host}${portSegment}/${pathSegment}${projectId}`;
}

module.exports = buildDsnUrl;