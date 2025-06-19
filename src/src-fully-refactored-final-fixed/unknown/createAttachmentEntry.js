/**
 * Creates a standardized attachment entry object with metadata.
 *
 * @param {any} attachmentData - The data to be attached, typically an object representing the attachment.
 * @returns {Object} An object containing the attachment, its type, a unique identifier, and a timestamp.
 */
function createAttachmentEntry(attachmentData) {
  return {
    // The actual attachment data
    attachment: attachmentData,
    // Type identifier for this entry
    type: "attachment",
    // Unique identifier for this attachment entry
    uuid: ID5(),
    // ISO string timestamp of when this entry was created
    timestamp: new Date().toISOString()
  };
}

module.exports = createAttachmentEntry;
