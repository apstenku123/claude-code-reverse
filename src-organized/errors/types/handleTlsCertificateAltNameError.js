/**
 * Handles a TLS certificate alt name error by validating the error code,
 * updating the internal error state, and notifying observers.
 *
 * @param {Object} tlsError - The error object related to TLS certificate alt name validation.
 * @param {string} tlsError.code - The error code string.
 * @returns {void}
 */
function handleTlsCertificateAltNameError(tlsError) {
  // Ensure the error code is not 'ERR_TLS_CERT_ALTNAME_INVALID'
  validateErrorCode(tlsError.code !== "ERR_TLS_CERT_ALTNAME_INVALID");

  // Update the internal error state with the provided error object
  this[internalErrorStateKey][lastValidationKey] = tlsError;

  // Notify observers or handlers about the error
  this[observerListKey][notifyMethodKey](tlsError);
}

module.exports = handleTlsCertificateAltNameError;