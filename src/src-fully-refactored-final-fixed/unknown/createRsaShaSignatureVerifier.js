/**
 * Creates a verifier function for RSA-SHA signatures with a specified hash length.
 *
 * @param {string|number} hashLength - The SHA hash length to use (e.g., 256 for SHA256).
 * @returns {Function} a function that verifies a signature given the data, signature, and public key.
 *
 * The returned function has the following signature:
 *   (dataToVerify: any, signatureBase64: string, publicKey: string) => boolean
 */
function createRsaShaSignatureVerifier(hashLength) {
  /**
   * Verifies an RSA-SHA signature for the given data and public key.
   *
   * @param {any} dataToVerify - The data whose signature needs to be verified. Will be stringified if not already a string.
   * @param {string} signatureBase64 - The signature to verify, encoded in base64.
   * @param {string} publicKey - The public key to use for verification.
   * @returns {boolean} True if the signature is valid, false otherwise.
   */
  return function verifySignature(dataToVerify, signatureBase64, publicKey) {
    // Perform any required setup or validation on the public key
    validateAsymmetricKeyObject(publicKey);

    // Ensure the data is a string (stringify if necessary)
    const stringifiedData = stringifyIfNotString(dataToVerify);

    // Prepare the signature for verification (e.g., decode or transform as needed)
    const processedSignature = normalizeBase64UrlString(signatureBase64);

    // Create a verifier for the specified RSA-SHA algorithm
    const verifier = gw.createVerify("RSA-SHA" + hashLength);

    // Update the verifier with the data
    verifier.update(stringifiedData);

    // Verify the signature using the public key and base64 encoding
    return verifier.verify(publicKey, processedSignature, "base64");
  };
}

module.exports = createRsaShaSignatureVerifier;
