/**
 * Checks if the Web Crypto API is available in the current environment.
 *
 * This function verifies that the code is running in a browser-like environment
 * (where the global 'window' object exists), and that the 'crypto' and 'crypto.subtle'
 * properties are present on the window object. This is necessary for using cryptographic
 * operations such as hashing, encryption, and decryption via the Web Crypto API.
 *
 * @returns {boolean} True if the Web Crypto API is available, false otherwise.
 */
function isWebCryptoAvailable() {
  // Ensure 'window' exists (i.e., running in a browser)
  // and that 'window.crypto' and 'window.crypto.subtle' are defined
  return (
    typeof window !== "undefined" &&
    typeof window.crypto !== "undefined" &&
    typeof window.crypto.subtle !== "undefined"
  );
}

module.exports = isWebCryptoAvailable;