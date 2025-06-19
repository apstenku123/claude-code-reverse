/**
 * Compares the 'fingerprint' arrays of two objects for equality.
 * Returns true if both fingerprints are missing, or if both exist and their joined string representations are equal.
 * Returns false if only one fingerprint exists, or if an error occurs during comparison.
 *
 * @param {Object} firstObject - The first object to compare, expected to have a 'fingerprint' property (array or undefined).
 * @param {Object} secondObject - The second object to compare, expected to have a 'fingerprint' property (array or undefined).
 * @returns {boolean} True if fingerprints are equal or both missing, false otherwise.
 */
function areFingerprintsEqual(firstObject, secondObject) {
  const firstFingerprint = firstObject.fingerprint;
  const secondFingerprint = secondObject.fingerprint;

  // If both fingerprints are missing, consider them equal
  if (!firstFingerprint && !secondFingerprint) {
    return true;
  }

  // If only one fingerprint exists, they are not equal
  if ((firstFingerprint && !secondFingerprint) || (!firstFingerprint && secondFingerprint)) {
    return false;
  }

  // Both fingerprints exist, compare their joined string representations
  try {
    return firstFingerprint.join("") === secondFingerprint.join("");
  } catch (error) {
    // If joining fails (e.g., not arrays), consider them not equal
    return false;
  }
}

module.exports = areFingerprintsEqual;