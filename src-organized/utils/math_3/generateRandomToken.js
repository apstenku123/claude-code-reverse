/**
 * Generates a secure random token by creating 32 random bytes and encoding them.
 *
 * This function uses the GA1.randomBytes method to generate a cryptographically secure
 * random byte array of length 32. The resulting byte array is then passed to the r1A
 * function, which is assumed to encode or transform the byte array into a string token.
 *
 * @returns {string} a securely generated random token as a string.
 */
function generateRandomToken() {
  // Generate 32 cryptographically secure random bytes
  const randomBytes = GA1.randomBytes(32);

  // Encode or transform the random bytes into a string token
  // (Assumes r1A is a function that performs encoding, e.g., base64 or hex)
  const randomToken = r1A(randomBytes);

  return randomToken;
}

module.exports = generateRandomToken;