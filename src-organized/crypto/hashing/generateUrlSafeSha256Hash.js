/**
 * Generates a URL-safe, base64-encoded SHA-256 hash of the given input string.
 *
 * @param {string} input - The input string to hash.
 * @returns {Promise<string>} a promise that resolves to the URL-safe base64-encoded SHA-256 hash.
 */
async function generateUrlSafeSha256Hash(input) {
  // Wait for the crypto module to be available and get the subtle crypto interface
  const cryptoModule = await Wl1;
  // Encode the input string as a Uint8Array
  const encodedInput = new TextEncoder().encode(input);
  // Compute the SHA-256 digest of the encoded input
  const hashBuffer = await cryptoModule.subtle.digest("SHA-256", encodedInput);
  // Convert the hash buffer to a string using fromCharCode
  const hashString = String.fromCharCode(...new Uint8Array(hashBuffer));
  // Encode the hash string to base64
  const base64Hash = btoa(hashString);
  // Make the base64 string URL-safe by replacing characters and removing padding
  const urlSafeBase64Hash = base64Hash.replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
  return urlSafeBase64Hash;
}

module.exports = generateUrlSafeSha256Hash;