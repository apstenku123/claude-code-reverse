/**
 * Extracts references to pasted text, images, or truncated text from a string.
 *
 * This function scans the input text for patterns like:
 *   [Pasted text #123]
 *   [Image #456 ...]
 *   [Truncated text #789 +10 lines.]
 * and returns an array of objects containing the extracted numeric updateSnapshotAndNotify and the full matched string.
 *
 * @param {string} inputText - The text to search for attachment references.
 * @returns {Array<{id: number, match: string}>} Array of objects with extracted updateSnapshotAndNotify and matched string.
 */
function extractAttachmentReferences(inputText) {
  // Regular expression to match references like [Pasted text #123], [Image #456], etc.
  const attachmentReferenceRegex = /\[(Pasted text|Image|\.\.\.Truncated text) #(\d+)(?: \+\d+ lines)?(\.)*\]/g;

  // Use matchAll to find all matches and map them to objects with id and match
  const matches = [...inputText.matchAll(attachmentReferenceRegex)]
    .map(match => ({
      // Extract the numeric updateSnapshotAndNotify from the second capture group, default to 0 if missing
      id: parseInt(match[2] || "0", 10),
      // Store the full matched string
      match: match[0]
    }))
    // Filter out any matches where the id is not greater than 0
    .filter(reference => reference.id > 0);

  return matches;
}

module.exports = extractAttachmentReferences;