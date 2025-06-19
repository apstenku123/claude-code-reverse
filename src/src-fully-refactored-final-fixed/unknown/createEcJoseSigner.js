/**
 * Creates a function that signs data using an EC algorithm and converts the signature to JOSE format.
 *
 * @param {string} ecCurveName - The name of the EC curve (e.g., '256', '384', '512') to use for signing.
 * @returns {Function} a function that takes signing arguments, signs the data, and returns a JOSE-formatted signature.
 */
function createEcJoseSigner(ecCurveName) {
  // Create a signer function for the specified EC curve
  const ecSigner = createRsaShaSigner(ecCurveName);

  /**
   * Signs data using the EC signer and converts the signature to JOSE format.
   *
   * @param {...any} args - Arguments to be passed to the signer function.
   * @returns {string} The JOSE-formatted signature.
   */
  return function signAndConvertToJose(...args) {
    // Sign the data using the EC signer
    let signature = ecSigner.apply(null, args);
    // Convert the DER-encoded signature to JOSE format (e.g., for JWT)
    signature = dF2.derToJose(signature, "ES" + ecCurveName);
    return signature;
  };
}

module.exports = createEcJoseSigner;