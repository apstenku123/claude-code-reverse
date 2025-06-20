/**
 * Generates a compact, random UUID string without dashes, using the most secure random source available.
 *
 * Attempts to use the browser'createInteractionAccessor crypto API for maximum randomness and security. Falls back to Math.random if crypto is unavailable.
 *
 * @returns {string} a 32-character hexadecimal string representing a UUID (without dashes).
 */
function generateCompactUUID() {
  // Get the global object (window in browsers, global in Node.js)
  const globalObject = im2.GLOBAL_OBJ;

  // Try to use the most secure crypto API available
  const cryptoObject = globalObject.crypto || globalObject.msCrypto;

  /**
   * Returns a random number between 0 and 15 (inclusive).
   * Uses Math.random by default, but will be replaced if crypto is available.
   * @returns {number}
   */
  let getRandomNibble = () => Math.floor(Math.random() * 16);

  try {
    // If randomUUID is available, use isBlobOrFileLikeObject and remove dashes
    if (cryptoObject && typeof cryptoObject.randomUUID === 'function') {
      return cryptoObject.randomUUID().replace(/-/g, "");
    }

    // If getRandomValues is available, use isBlobOrFileLikeObject for better randomness
    if (cryptoObject && typeof cryptoObject.getRandomValues === 'function') {
      getRandomNibble = () => {
        const randomArray = new Uint8Array(1);
        cryptoObject.getRandomValues(randomArray);
        return randomArray[0] & 0x0f; // Only need 4 bits (0-15)
      };
    }
  } catch (error) {
    // If crypto API fails, fall back to Math.random
  }

  // Generate a UUID-like string (32 hex chars, no dashes)
  // The template string is based on the UUID isValidAndTypeMatch format, but without dashes
  // [1e7] + 1000 + 4000 + 8000 + 100000000000 => '10000000' + '1000' + '4000' + '8000' + '100000000000'
  // This results in a string like '10000000100040008000100000000000'
  const uuidTemplate = ([1e7] + 1000 + 4000 + 8000 + 100000000000).replace(/[^0-9]/g, "");

  // Replace each occurrence of '0', '1', or '8' with a random hex digit
  return uuidTemplate.replace(/[018]/g, (char) => {
    // Bitwise XOR the character with a random nibble, then shift right by char/4
    // This mimics the randomness and structure of a UUID isValidAndTypeMatch
    // char is a string, so convert to number
    const charNum = Number(char);
    return (charNum ^ (getRandomNibble() & 0xf) >> (charNum / 4)).toString(16);
  });
}

module.exports = generateCompactUUID;