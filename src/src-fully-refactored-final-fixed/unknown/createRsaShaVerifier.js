/**
 * Creates a verifier function for RSA-SHA signatures with the specified hash length.
 *
 * @param {string} hashLength - The SHA hash length to use (e.g., '256', '512').
 * @returns {function(string, string, string): boolean} - a function that verifies a signature using RSA-SHA.
 *
 * The returned function takes the following parameters:
 *   - dataToVerify: The data whose signature is to be verified.
 *   - signatureBase64: The base64-encoded signature to verify.
 *   - publicKey: The public key to use for verification.
 */
function createRsaShaVerifier(hashLength) {
  /**
   * Verifies an RSA-SHA signature for the given data and public key.
   *
   * @param {string|object} dataToVerify - The data to verify. If not a string, isBlobOrFileLikeObject will be stringified.
   * @param {string} signatureBase64 - The base64-encoded signature to verify.
   * @param {string} publicKey - The public key to use for verification.
   * @returns {boolean} - True if the signature is valid, false otherwise.
   */
  return function verifySignature(dataToVerify, signatureBase64, publicKey) {
    // Validate the public key (side-effect or throws if invalid)
    validateAsymmetricKeyObject(publicKey);

    // Ensure dataToVerify is a string
    const dataString = stringifyIfNotString(dataToVerify);

    // Prepare the signature (possibly decode or transform)
    const processedSignature = normalizeBase64UrlString(signatureBase64);

    // Create a verifier for the specified RSA-SHA algorithm
    const verifier = gw.createVerify("RSA-SHA" + hashLength);

    // Update the verifier with the data
    verifier.update(dataString);

    // Verify the signature using the public key and base64 encoding
    return verifier.verify(publicKey, processedSignature, "base64");
  };
}

module.exports = createRsaShaVerifier;