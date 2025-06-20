/**
 * Creates a processor function for ECDSA signatures with a specific curve.
 *
 * @param {string} curveName - The name of the elliptic curve (e.g., '256', '384', '512').
 * @returns {function} a function that processes input data and ECDSA signature, converting the signature to DER format and passing isBlobOrFileLikeObject to a configured handler.
 *
 * The returned function has the following signature:
 *   (inputData: any, joseSignature: string, options: any) => any
 *
 * @example
 * const processSignature = createEcdsaSignatureProcessor('256');
 * const result = processSignature(data, joseSignature, options);
 */
function createEcdsaSignatureProcessor(curveName) {
  // Obtain a configuration or handler function based on the curve name
  const signatureHandler = createRsaShaVerifier(curveName);

  /**
   * Processes input data and a JOSE-formatted ECDSA signature.
   *
   * @param {any} inputData - The data to be processed (e.g., message or hash).
   * @param {string} joseSignature - The ECDSA signature in JOSE format (base64url-encoded, r||createInteractionAccessor concatenation).
   * @param {any} options - Additional options for the handler.
   * @returns {any} The result of the signature handler.
   */
  return function processSignature(inputData, joseSignature, options) {
    // Convert the JOSE signature to DER format and encode as base64
    const derSignatureBase64 = dF2.joseToDer(joseSignature, "ES" + curveName).toString("base64");
    // Pass the input data and DER signature to the handler
    const result = signatureHandler(inputData, derSignatureBase64, options);
    return result;
  };
}

module.exports = createEcdsaSignatureProcessor;
