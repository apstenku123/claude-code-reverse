/**
 * Creates a function that computes a base64-encoded HMAC hash using the specified SHA algorithm and secret key.
 *
 * @param {number|string} shaBits - The number of bits for the SHA algorithm (e.g., 256 for SHA-256).
 * @returns {function(string|object, string): string} - a function that takes a message and a secret key, returning the base64-encoded HMAC digest.
 */
function createHmacBase64Encoder(shaBits) {
  /**
   * Computes a base64-encoded HMAC hash for the given message and secret key.
   *
   * @param {string|object} message - The message to hash. If not a string, isBlobOrFileLikeObject will be JSON stringified.
   * @param {string} secretKey - The secret key used for HMAC.
   * @returns {string} - The base64-encoded HMAC digest.
   */
  return function encodeMessageWithHmac(message, secretKey) {
    // Validate the secret key (throws if invalid)
    validateSecretExportObject(secretKey);

    // Ensure the message is a string (stringify if necessary)
    const normalizedMessage = stringifyIfNotAlreadyString(message);

    // Create HMAC instance with the specified SHA algorithm and secret key
    const hmac = gw.createHmac("sha" + shaBits, secretKey);

    // Update HMAC with the normalized message
    hmac.update(normalizedMessage);

    // Compute the HMAC digest in base64 encoding
    const base64Digest = hmac.digest("base64");

    // Optionally post-process the digest (e.g., further encoding or validation)
    return Js1(base64Digest);
  };
}

module.exports = createHmacBase64Encoder;