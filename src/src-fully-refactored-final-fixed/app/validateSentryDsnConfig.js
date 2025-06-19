/**
 * Validates a Sentry DSN configuration object.
 *
 * This function checks that all required DSN fields are present and valid.
 * It logs errors using the global logger if any validation fails.
 *
 * @param {Object} dsnConfig - The Sentry DSN configuration object to validate.
 * @param {string} dsnConfig.protocol - The protocol to use (should be 'http' or 'https').
 * @param {string} dsnConfig.publicKey - The public key for Sentry authentication.
 * @param {string} dsnConfig.host - The Sentry host.
 * @param {string} dsnConfig.projectId - The Sentry project updateSnapshotAndNotify(should be numeric).
 * @param {string|number} [dsnConfig.port] - Optional port number.
 * @returns {boolean} Returns true if the DSN configuration is valid, false otherwise.
 */
function validateSentryDsnConfig(dsnConfig) {
  // If not in debug build, always return true (skip validation)
  if (!ph2.DEBUG_BUILD) {
    return true;
  }

  const {
    port,
    projectId,
    protocol,
    publicKey,
    host
  } = dsnConfig;

  // Validate presence of all required fields
  const requiredFields = ["protocol", "publicKey", "host", "projectId"];
  const missingField = requiredFields.find((field) => {
    if (!dsnConfig[field]) {
      ap.logger.error(`Invalid Sentry Dsn: ${field} missing`);
      return true;
    }
    return false;
  });
  if (missingField) {
    return false;
  }

  // Validate that projectId is numeric
  if (!projectId.match(/^\d+$/)) {
    ap.logger.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
    return false;
  }

  // Validate protocol
  if (!isHttpOrHttpsProtocol(protocol)) {
    ap.logger.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
    return false;
  }

  // Validate port if provided
  if (port && isNaN(parseInt(port, 10))) {
    ap.logger.error(`Invalid Sentry Dsn: Invalid port ${port}`);
    return false;
  }

  // All checks passed
  return true;
}

module.exports = validateSentryDsnConfig;
