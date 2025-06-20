/**
 * Determines if the client is configured to send default Personally Identifiable Information (PII).
 *
 * @returns {boolean} True if the client exists and its options specify to send default PII, otherwise false.
 */
function shouldSendDefaultPii() {
  // Retrieve the current client instance from VU
  const client = VU.getClient();

  // If the client exists, check its options for the 'sendDefaultPii' flag
  // Use Boolean() to ensure the return value is always a boolean
  return client ? Boolean(client.getOptions().sendDefaultPii) : false;
}

module.exports = shouldSendDefaultPii;