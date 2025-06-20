/**
 * Creates a value record object containing the provided value, digest, and stack trace.
 *
 * @param {any} value - The value to be stored in the record.
 * @param {string|null} digest - An optional digest or hash representing the value'createInteractionAccessor state. Can be null.
 * @param {string|null} stackTrace - An optional stack trace string. Can be null.
 * @returns {Object} An object containing the value, a null source, the stack trace, and the digest.
 */
function createValueRecord(value, digest, stackTrace) {
  return {
    value: value,
    source: null, // Source is always set to null in this context
    stack: stackTrace != null ? stackTrace : null, // Include stack trace if provided
    digest: digest != null ? digest : null // Include digest if provided
  };
}

module.exports = createValueRecord;