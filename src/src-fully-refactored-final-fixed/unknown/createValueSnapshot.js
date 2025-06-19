/**
 * Creates a snapshot object representing a value, its digest, and stack trace.
 *
 * @param {any} value - The value to be stored in the snapshot.
 * @param {string|null} digest - An optional digest or hash representing the value'createInteractionAccessor state. If not provided, will be set to null.
 * @param {string|null} stackTrace - An optional stack trace string. If not provided, will be set to null.
 * @returns {Object} An object containing the value, a null source, the stack trace, and the digest.
 */
function createValueSnapshot(value, digest, stackTrace) {
  return {
    value: value, // The main value being captured
    source: null, // Source is always null as per original logic
    stack: stackTrace != null ? stackTrace : null, // Use stackTrace if provided, else null
    digest: digest != null ? digest : null // Use digest if provided, else null
  };
}

module.exports = createValueSnapshot;