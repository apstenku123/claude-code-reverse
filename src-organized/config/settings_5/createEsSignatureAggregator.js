/**
 * Creates a function that aggregates recent input entries for ES (Elliptic Curve Signature) operations.
 *
 * This higher-order function prepares a configuration based on the provided curve name, and returns
 * a function that, given input data, a JOSE-formatted signature, and additional options, will:
 *   1. Convert the JOSE signature to DER format for the specified ES curve.
 *   2. Aggregate recent input entries using the provided configuration and return the result.
 *
 * @param {string} curveName - The name of the elliptic curve (e.g., '256', '384', '512').
 * @returns {function(inputData: any, joseSignature: Buffer | string, options: any): any} -
 *   a function that aggregates recent input entries after converting the signature format.
 */
function createEsSignatureAggregator(curveName) {
  // Prepare the configuration for the specified curve
  const aggregateConfig = createRsaShaVerifier(curveName);

  /**
   * Aggregates recent input entries after converting the signature from JOSE to DER format.
   *
   * @param {any} inputData - The input data to aggregate.
   * @param {Buffer|string} joseSignature - The signature in JOSE format.
   * @param {any} options - Additional options for aggregation.
   * @returns {any} The result of the aggregation process.
   */
  return function aggregateRecentEntries(inputData, joseSignature, options) {
    // Convert the JOSE signature to DER format for the specified ES curve, then encode as base64
    const derSignatureBase64 = dF2.joseToDer(joseSignature, "ES" + curveName).toString("base64");
    // Aggregate the recent input entries using the prepared configuration
    const aggregationResult = aggregateConfig(inputData, derSignatureBase64, options);
    return aggregationResult;
  };
}

module.exports = createEsSignatureAggregator;
