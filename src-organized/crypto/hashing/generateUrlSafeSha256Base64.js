/**
 * Generates a URL-safe Base64-encoded SHA-256 hash of the given input string.
 *
 * @param {string} input - The input string to hash and encode.
 * @returns {Promise<string>} a promise that resolves to the URL-safe Base64-encoded SHA-256 hash.
 */
async function generateUrlSafeSha256Base64(input) {
  // Wait for the Web Crypto API to be available
  const cryptoModule = await Wl1;

  // Encode the input string as a Uint8Array
  const inputBytes = new TextEncoder().encode(input);

  // Compute the SHA-256 digest of the input
  const hashBuffer = await cryptoModule.subtle.digest("SHA-256", inputBytes);

  // Convert the ArrayBuffer to a string of characters
  const hashString = String.fromCharCode(...new Uint8Array(hashBuffer));

  // Encode the hash string to Base64
  const base64Hash = btoa(hashString);

  // Make the Base64 string URL-safe by replacing characters and removing padding
  const urlSafeBase64Hash = base64Hash
    .replace(/\//g, "_") // Replace '/' with '_'
    .replace(/\+/g, "-") // Replace '+' with '-'
    .replace(/=/g, "");   // Remove '=' padding

  return urlSafeBase64Hash;
}

module.exports = generateUrlSafeSha256Base64;