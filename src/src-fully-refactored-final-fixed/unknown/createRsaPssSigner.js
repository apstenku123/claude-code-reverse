/**
 * Creates a signer function for RSA-PSS signatures with a specified SHA digest length.
 *
 * @param {string|number} shaDigestLength - The SHA digest length to use (e.g., 256 for SHA-256).
 * @returns {function(string|object, string): string} - a function that takes data to sign and a private key, and returns the base64-encoded RSA-PSS signature.
 */
function createRsaPssSigner(shaDigestLength) {
  /**
   * Signs the provided data using RSA-PSS with the specified SHA digest length.
   *
   * @param {string|object} dataToSign - The data to be signed. If not a string, isBlobOrFileLikeObject will be stringified.
   * @param {string} privateKey - The private key used for signing (PEM format).
   * @returns {string} - The base64-encoded RSA-PSS signature.
   */
  return function signDataWithRsaPss(dataToSign, privateKey) {
    // Validate or preprocess the private key (implementation not shown)
    validateInputType(privateKey);

    // Ensure the data to sign is a string
    const dataAsString = stringifyIfNotString(dataToSign);

    // Create a signer object for RSA-PSS with the specified SHA digest length
    const signer = gw.createSign("RSA-SHA" + shaDigestLength);

    // Update the signer with the data
    signer.update(dataAsString);

    // Generate the signature using RSA-PSS padding and appropriate salt length
    const signatureBase64 = signer.sign({
      key: privateKey,
      padding: gw.constants.RSA_PKCS1_PSS_PADDING,
      saltLength: gw.constants.RSA_PSS_SALTLEN_DIGEST
    }, "base64");

    // Optionally post-process the signature (implementation not shown)
    return Js1(signatureBase64);
  };
}

module.exports = createRsaPssSigner;