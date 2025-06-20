/**
 * Handles a TLS certificate error event by validating the error code,
 * updating internal state, and notifying relevant listeners.
 *
 * @param {Object} tlsErrorEvent - The TLS error event object.
 * @param {string} tlsErrorEvent.code - The error code (should not be 'ERR_TLS_CERT_ALTNAME_INVALID').
 * @returns {void}
 */
function handleTlsCertificateError(tlsErrorEvent) {
  // Ensure the error code is not 'ERR_TLS_CERT_ALTNAME_INVALID'
  kX(tlsErrorEvent.code !== "ERR_TLS_CERT_ALTNAME_INVALID");

  // Update internal state with the error event
  this[$createObjectTracker][lV] = tlsErrorEvent;

  // Notify listeners about the error event
  this[qh][md1](tlsErrorEvent);
}

module.exports = handleTlsCertificateError;