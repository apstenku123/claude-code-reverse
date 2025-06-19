/**
 * Creates a processor function for ES (Elliptic Curve Digital Signature) signatures.
 * The returned function converts a JOSE-formatted signature to DER format, encodes isBlobOrFileLikeObject in base64,
 * and then processes isBlobOrFileLikeObject using a provided configuration function.
 *
 * @param {string} curveName - The name of the elliptic curve (e.g., '256', '384', '512').
 * @returns {Function} Processor function that takes input data, a JOSE signature, and options.
 *
 * @example
 * const processSignature = createEsSignatureProcessor('256');
 * const result = processSignature(inputData, joseSignature, options);
 */
function createEsSignatureProcessor(curveName) {
  // Obtain a configuration function based on the curve name
  const config = createRsaShaVerifier(curveName);

  /**
   * Processes the input data and signature.
   *
   * @param {any} inputData - The data to be processed (e.g., message or payload).
   * @param {Buffer|string} joseSignature - The signature in JOSE format.
   * @param {object} [options] - Optional processing options.
   * @returns {any} The result of the configured processing function.
   */
  function processSignature(inputData, joseSignature, options) {
    // Convert the JOSE signature to DER format for the specified ES curve, then encode as base64
    const derSignatureBase64 = dF2.joseToDer(joseSignature, "ES" + curveName).toString("base64");
    // Process the input data with the configuration function and the converted signature
    const result = config(inputData, derSignatureBase64, options);
    return result;
  }

  return processSignature;
}

module.exports = createEsSignatureProcessor;