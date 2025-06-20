/**
 * Creates a function that generates a base64-encoded HMAC hash using the specified SHA algorithm and secret key.
 *
 * @param {number|string} shaBits - The number of bits for the SHA algorithm (e.g., 256 for SHA256).
 * @returns {function(string, string): string} - a function that takes a message and a secret key, and returns the base64-encoded HMAC hash.
 */
function createHmacBase64Hasher(shaBits) {
  /**
   * Generates a base64-encoded HMAC hash for the given message and secret key.
   *
   * @param {string} message - The message to hash.
   * @param {string} secretKey - The secret key used for HMAC.
   * @returns {string} - The base64-encoded HMAC hash.
   */
  return function generateHmacBase64(message, secretKey) {
    // Validate or process the secret key (side effect or validation)
    validateSecretExportObject(secretKey);

    // Ensure the message is a string; convert if necessary
    const messageString = stringifyIfNotString(message);

    // Create HMAC instance with the specified SHA algorithm and secret key
    const hmac = gw.createHmac("sha" + shaBits, secretKey);

    // Update the HMAC with the message
    hmac.update(messageString);

    // Compute the digest in base64 encoding
    const base64Digest = hmac.digest("base64");

    // Post-process the digest (e.g., formatting, validation)
    return Js1(base64Digest);
  };
}

module.exports = createHmacBase64Hasher;