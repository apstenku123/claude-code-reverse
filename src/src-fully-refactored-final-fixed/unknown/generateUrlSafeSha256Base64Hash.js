/**
 * Generates a URL-safe Base64-encoded SHA-256 hash of the input string.
 *
 * @param {string} input - The string to hash and encode.
 * @returns {Promise<string>} a promise that resolves to the URL-safe Base64-encoded SHA-256 hash.
 */
async function generateUrlSafeSha256Base64Hash(input) {
  // Wait for the Web Crypto API to be available (Wl1 is assumed to be a Promise resolving to window.crypto)
  const cryptoApi = await Wl1;

  // Encode the input string as a Uint8Array
  const inputBytes = new TextEncoder().encode(input);

  // Compute the SHA-256 digest of the input
  const hashBuffer = await cryptoApi.subtle.digest("SHA-256", inputBytes);

  // Convert the ArrayBuffer to a string of characters
  const hashChars = String.fromCharCode(...new Uint8Array(hashBuffer));

  // Encode the string as Base64
  const base64Hash = btoa(hashChars);

  // Make the Base64 string URL-safe by replacing characters
  const urlSafeBase64Hash = base64Hash
    .replace(/\//g, "_") // Replace '/' with '_'
    .replace(/\+/g, "-") // Replace '+' with '-'
    .replace(/=/g, "");   // Remove '=' padding

  return urlSafeBase64Hash;
}

module.exports = generateUrlSafeSha256Base64Hash;