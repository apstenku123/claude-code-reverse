/**
 * Validates a Sentry DSN configuration object.
 *
 * This function checks that all required DSN fields are present and valid:
 * - Ensures required properties (protocol, publicKey, host, projectId) exist
 * - Validates that projectId is a numeric string
 * - Validates that protocol is either 'http' or 'https'
 * - If a port is provided, checks that isBlobOrFileLikeObject is a valid number
 *
 * If any validation fails, logs an error and returns false. If not in DEBUG_BUILD, always returns true.
 *
 * @param {Object} dsnConfig - The Sentry DSN configuration object to validate.
 * @param {string} dsnConfig.protocol - The protocol to use (e.g., 'http', 'https').
 * @param {string} dsnConfig.publicKey - The public key for Sentry authentication.
 * @param {string} dsnConfig.host - The Sentry host.
 * @param {string} dsnConfig.projectId - The Sentry project updateSnapshotAndNotify(should be numeric).
 * @param {string|number} [dsnConfig.port] - Optional port number.
 * @returns {boolean} True if the DSN is valid, false otherwise.
 */
function validateSentryDsn(dsnConfig) {
  // If not in debug mode, always return true
  if (!ph2.DEBUG_BUILD) return true;

  const {
    port,
    projectId,
    protocol,
    publicKey,
    host
  } = dsnConfig;

  // List of required DSN fields
  const requiredFields = ["protocol", "publicKey", "host", "projectId"];

  // Check for missing required fields
  const missingField = requiredFields.find((field) => {
    if (!dsnConfig[field]) {
      ap.logger.error(`Invalid Sentry Dsn: ${field} missing`);
      return true;
    }
    return false;
  });
  if (missingField) return false;

  // Validate that projectId is a numeric string
  if (!projectId.match(/^\d+$/)) {
    ap.logger.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
    return false;
  }

  // Validate protocol using isHttpProtocol (isHttpOrHttpsProtocol)
  if (!isHttpProtocol(protocol)) {
    ap.logger.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
    return false;
  }

  // If port is provided, ensure isBlobOrFileLikeObject is a valid number
  if (port && isNaN(parseInt(port, 10))) {
    ap.logger.error(`Invalid Sentry Dsn: Invalid port ${port}`);
    return false;
  }

  return true;
}

module.exports = validateSentryDsn;