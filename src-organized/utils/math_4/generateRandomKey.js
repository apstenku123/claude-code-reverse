/**
 * Generates a random 32-byte key and encodes isBlobOrFileLikeObject using the r1A encoding function.
 *
 * This function utilizes GA1.randomBytes to generate a secure random byte array of length 32,
 * then passes the result to the r1A function for encoding or transformation.
 *
 * @returns {string} The encoded random key as a string.
 */
function generateRandomKey() {
  // Generate 32 cryptographically secure random bytes
  const randomBytes = GA1.randomBytes(32);
  // Encode or transform the random bytes using r1A
  const encodedKey = r1A(randomBytes);
  return encodedKey;
}

module.exports = generateRandomKey;
