/**
 * Verifies a JWS (JSON Web Signature) using the provided algorithm and verification parameters.
 *
 * @param {string} jwsPayload - The JWS payload to verify.
 * @param {string} algorithm - The algorithm to use for verification.
 * @param {any} verificationOptions - Additional options or key material for verification.
 * @returns {any} The result of the verification process, as returned by the algorithm'createInteractionAccessor verify method.
 * @throws {Error} If the algorithm parameter is missing.
 */
function verifyJwsSignature(jwsPayload, algorithm, verificationOptions) {
  // Ensure the algorithm parameter is provided
  if (!algorithm) {
    const error = new Error("Missing algorithm parameter for jws.verify");
    error.code = "MISSING_ALGORITHM";
    throw error;
  }

  // Normalize or preprocess the JWS payload
  const normalizedPayload = GJ2(jwsPayload);

  // Extract the signature from the normalized payload
  const signature = DJ2(normalizedPayload);

  // Extract the protected header or relevant data from the normalized payload
  const protectedHeader = U05(normalizedPayload);

  // Get the verification algorithm implementation
  const algorithmImpl = V05(algorithm);

  // Perform the verification using the algorithm implementation
  return algorithmImpl.verify(protectedHeader, signature, verificationOptions);
}

module.exports = verifyJwsSignature;