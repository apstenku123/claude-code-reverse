/**
 * Creates a standardized attachment record object with a unique identifier and timestamp.
 *
 * @param {any} attachmentData - The data to be attached (could be a file, object, or any payload).
 * @returns {Object} An object representing the attachment record, including the original data, type, uuid, and timestamp.
 */
function createAttachmentRecord(attachmentData) {
  return {
    // The original data being attached
    attachment: attachmentData,
    // Specifies the type of this record
    type: "attachment",
    // Generates a unique identifier for this record
    uuid: ID5(),
    // Records the creation time in ISO format
    timestamp: new Date().toISOString()
  };
}

module.exports = createAttachmentRecord;