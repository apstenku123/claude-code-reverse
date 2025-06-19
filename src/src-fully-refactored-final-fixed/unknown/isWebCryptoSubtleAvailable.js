/**
 * Checks if the Web Crypto API'createInteractionAccessor SubtleCrypto interface is available in the current environment.
 *
 * @returns {boolean} True if running in a browser environment and window.crypto.subtle is defined; otherwise, false.
 */
function isWebCryptoSubtleAvailable() {
  // Ensure handleMissingDoctypeError are in a browser-like environment and that the Web Crypto API'createInteractionAccessor subtle interface exists
  const isWindowDefined = typeof window !== "undefined";
  const isCryptoDefined = isWindowDefined && typeof window.crypto !== "undefined";
  const isSubtleDefined = isCryptoDefined && typeof window.crypto.subtle !== "undefined";
  return isSubtleDefined;
}

module.exports = isWebCryptoSubtleAvailable;