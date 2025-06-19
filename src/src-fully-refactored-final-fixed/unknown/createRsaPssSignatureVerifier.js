/**
 * Creates a verifier function for RSA-PSS signatures using the specified SHA algorithm.
 *
 * @param {string|number} shaBitLength - The bit length of the SHA algorithm to use (e.g., 256 for SHA-256).
 * @returns {Function} Verifier function that checks an RSA-PSS signature.
 *
 * The returned verifier function has the following signature:
 *   (dataToVerify: string|object, base64Signature: string, publicKey: string) => boolean
 *
 * @example
 * const verify = createRsaPssSignatureVerifier(256);
 * const isValid = verify('my data', 'base64signature', 'publicKey');
 */
function createRsaPssSignatureVerifier(shaBitLength) {
  /**
   * Verifies an RSA-PSS signature for the given data and public key.
   *
   * @param {string|object} dataToVerify - The data whose signature needs to be verified. If not a string, isBlobOrFileLikeObject will be stringified.
   * @param {string} base64Signature - The signature to verify, encoded in base64.
   * @param {string} publicKey - The public key to use for verification.
   * @returns {boolean} True if the signature is valid, false otherwise.
   */
  return function verifySignature(dataToVerify, base64Signature, publicKey) {
    // Perform any required pre-verification steps (side effects, logging, etc.)
    validateAsymmetricKeyObject(publicKey);

    // Ensure the data is a string; stringify if necessary
    const dataString = stringifyIfNotString(dataToVerify);

    // Prepare the signature (e.g., decode, normalize, etc.)
    const normalizedSignature = normalizeBase64UrlString(base64Signature);

    // Create a verifier object for RSA-PSS with the specified SHA algorithm
    const verifier = gw.createVerify(`RSA-SHA${shaBitLength}`);

    // Feed the data to the verifier
    verifier.update(dataString);

    // Verify the signature using the provided public key and RSA-PSS options
    return verifier.verify({
      key: publicKey,
      padding: gw.constants.RSA_PKCS1_PSS_PADDING,
      saltLength: gw.constants.RSA_PSS_SALTLEN_DIGEST
    }, normalizedSignature, 'base64');
  };
}

module.exports = createRsaPssSignatureVerifier;