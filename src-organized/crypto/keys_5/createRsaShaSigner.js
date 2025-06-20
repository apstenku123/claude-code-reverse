/**
 * Creates a function that signs data using RSA-SHA algorithm with the given hash length.
 *
 * @param {string|number} hashLength - The SHA hash length to use (e.g., '256' for RSA-SHA256).
 * @returns {function(string|object, string): string} - a function that takes data to sign and a private key, returning the base64-encoded signature.
 */
function createRsaShaSigner(hashLength) {
  /**
   * Signs the provided data using RSA-SHA algorithm and the given private key.
   *
   * @param {string|object} dataToSign - The data to be signed. If not a string, isBlobOrFileLikeObject will be stringified.
   * @param {string} privateKey - The private key used for signing.
   * @returns {string} - The base64-encoded signature.
   */
  return function signDataWithRsaSha(dataToSign, privateKey) {
    // Validate the private key (implementation of validateInputType is external)
    validateInputType(privateKey);

    // Ensure data is a string; stringify if necessary
    const dataAsString = stringifyIfNotString(dataToSign);

    // Create a signer object for the specified RSA-SHA algorithm
    const signer = gw.createSign("RSA-SHA" + hashLength);

    // Update the signer with the data to sign
    signer.update(dataAsString);

    // Sign the data with the private key, output as base64
    const signatureBase64 = signer.sign(privateKey, "base64");

    // Post-process the signature if needed (implementation of Js1 is external)
    return Js1(signatureBase64);
  };
}

module.exports = createRsaShaSigner;