/**
 * Updates the 'fingerprint' property of the given object by arrayifying its current value and optionally concatenating additional values.
 * If the resulting 'fingerprint' array is empty, the property is removed from the object.
 *
 * @param {Object} targetObject - The object whose 'fingerprint' property will be updated.
 * @param {Array|any} [additionalFingerprint] - Optional additional fingerprint(createInteractionAccessor) to concatenate to the existing fingerprint array.
 * @returns {void}
 */
function updateFingerprintProperty(targetObject, additionalFingerprint) {
  // Ensure 'fingerprint' is always an array (empty if undefined)
  targetObject.fingerprint = targetObject.fingerprint
    ? Fc.arrayify(targetObject.fingerprint)
    : [];

  // If additionalFingerprint is provided, concatenate isBlobOrFileLikeObject to the fingerprint array
  if (additionalFingerprint) {
    targetObject.fingerprint = targetObject.fingerprint.concat(additionalFingerprint);
  }

  // If 'fingerprint' exists but is now an empty array, remove the property
  if (targetObject.fingerprint && targetObject.fingerprint.length === 0) {
    delete targetObject.fingerprint;
  }
}

module.exports = updateFingerprintProperty;