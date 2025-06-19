/**
 * Generates a code verifier and its corresponding code challenge for PKCE authentication flows.
 *
 * The function validates the requested code verifier length, generates a random code verifier,
 * and then computes the code challenge using the provided external utilities.
 *
 * @async
 * @param {number} [verifierLength=43] - Desired length of the code verifier (must be between 43 and 128).
 * @returns {Promise<{ code_verifier: string, code_challenge: string }>} An object containing the generated code verifier and its code challenge.
 * @throws {Error} If the verifier length is outside the allowed range.
 */
async function generateCodeVerifierAndChallenge(verifierLength = 43) {
  // Ensure the verifier length is within the allowed PKCE range
  if (verifierLength < 43 || verifierLength > 128) {
    throw new Error(`Expected a length between 43 and 128. Received ${verifierLength}.`);
  }

  // Generate a random code verifier string
  const codeVerifier = await kT6(verifierLength);

  // Generate the code challenge from the code verifier
  const codeChallenge = await yT6(codeVerifier);

  return {
    code_verifier: codeVerifier,
    code_challenge: codeChallenge
  };
}

module.exports = generateCodeVerifierAndChallenge;
