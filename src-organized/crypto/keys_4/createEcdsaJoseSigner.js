/**
 * Creates a signer function for ECDSA keys that outputs JOSE-formatted signatures.
 *
 * @param {string} hashLength - The hash length (e.g., '256', '384', '512') to use for the ECDSA algorithm.
 * @returns {Function} a function that, when called with signing arguments, returns a JOSE-formatted signature string.
 */
function createEcdsaJoseSigner(hashLength) {
  // Create a signer function for the specified hash length
  const ecdsaSigner = createRsaShaSigner(hashLength);

  /**
   * Signs data using ECDSA and converts the signature to JOSE format.
   *
   * @param {...any} args - Arguments to pass to the signer (e.g., data, private key).
   * @returns {string} JOSE-formatted signature.
   */
  return function signAndConvertToJose(...args) {
    // Sign the data using the ECDSA signer
    let derSignature = ecdsaSigner.apply(null, args);
    // Convert the DER-encoded signature to JOSE format (e.g., for JWT)
    const joseSignature = dF2.derToJose(derSignature, "ES" + hashLength);
    return joseSignature;
  };
}

module.exports = createEcdsaJoseSigner;