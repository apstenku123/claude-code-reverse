/**
 * Creates an attachment payload object and its associated data buffer or processed content.
 *
 * @param {Object} attachment - The attachment source object containing metadata and data.
 * @param {Object} options - Additional options or configuration for processing the attachment data.
 * @returns {[Object, Buffer|string]} An array containing the sanitized attachment metadata object and the processed data.
 */
function createAttachmentPayload(attachment, options) {
  // Determine the content: if data is a string, process isBlobOrFileLikeObject with FU1; otherwise, use as-is
  const content = typeof attachment.data === "string"
    ? FU1(attachment.data, options)
    : attachment.data;

  // Build the metadata object, dropping undefined keys
  const metadata = n5A.dropUndefinedKeys({
    type: "attachment",
    length: content.length,
    filename: attachment.filename,
    content_type: attachment.contentType,
    attachment_type: attachment.attachmentType
  });

  return [metadata, content];
}

module.exports = createAttachmentPayload;