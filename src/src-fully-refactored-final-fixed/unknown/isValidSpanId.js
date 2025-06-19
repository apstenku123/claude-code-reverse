/**
 * Checks if the provided span updateSnapshotAndNotify is valid.
 * a valid span updateSnapshotAndNotify must pass the nf4 regular expression test and must not be equal to RD0.INVALID_SPANID.
 *
 * @param {string} spanId - The span updateSnapshotAndNotify to validate.
 * @returns {boolean} True if the span updateSnapshotAndNotify is valid, false otherwise.
 */
function isValidSpanId(spanId) {
  // Check if spanId matches the expected pattern and is not the invalid constant
  return nf4.test(spanId) && spanId !== RD0.INVALID_SPANID;
}

module.exports = isValidSpanId;