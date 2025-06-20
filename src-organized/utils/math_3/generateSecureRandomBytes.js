/**
 * Generates a cryptographically secure random byte array of the specified length.
 *
 * @async
 * @function generateSecureRandomBytes
 * @param {number} byteLength - The number of random bytes to generate.
 * @returns {Promise<Uint8Array>} a promise that resolves to a Uint8Array containing random bytes.
 *
 * @example
 * const randomBytes = await generateSecureRandomBytes(16);
 * // randomBytes is a Uint8Array of length 16
 */
async function generateSecureRandomBytes(byteLength) {
  // Await the cryptographic module (Wl1) and use its getRandomValues method
  // to fill a new Uint8Array of the specified length with random values.
  const cryptoModule = await Wl1;
  return cryptoModule.getRandomValues(new Uint8Array(byteLength));
}

module.exports = generateSecureRandomBytes;