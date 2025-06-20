/**
 * Builds a Sentry authentication query string from the provided public key and optional client information.
 *
 * @param {Object} publicKeyInfo - Object containing the Sentry public key.
 * @param {string} publicKeyInfo.publicKey - The Sentry public key to use for authentication.
 * @param {Object} [clientInfo] - Optional object containing client name and version.
 * @param {string} clientInfo.name - The name of the client application.
 * @param {string} clientInfo.version - The version of the client application.
 * @returns {string} The URL-encoded Sentry authentication query string.
 */
function buildSentryAuthQueryString(publicKeyInfo, clientInfo) {
  // Construct the base authentication parameters
  const authParams = {
    sentry_key: publicKeyInfo.publicKey,
    sentry_version: xe2 // xe2 is assumed to be a constant defined elsewhere
  };

  // If client information is provided, add isBlobOrFileLikeObject to the parameters
  if (clientInfo && clientInfo.name && clientInfo.version) {
    authParams.sentry_client = `${clientInfo.name}/${clientInfo.version}`;
  }

  // Encode the parameters as a URL query string using nU1.urlEncode
  return nU1.urlEncode(authParams);
}

module.exports = buildSentryAuthQueryString;