/**
 * Parses a processing instruction from an XML string starting at a given index.
 * If a valid processing instruction is found, calls the provided handler and returns the index after the instruction.
 *
 * @param {string} xmlString - The XML string to parse.
 * @param {number} startIndex - The index in xmlString to start searching from.
 * @param {object} handler - An object with a processingInstruction(target, data) method to handle the instruction.
 * @returns {number} The index immediately after the processing instruction, or -1 if not found or invalid.
 */
function parseProcessingInstruction(xmlString, startIndex, handler) {
  // Find the index of the end of the processing instruction
  const endIndex = xmlString.indexOf('?>', startIndex);
  if (endIndex === -1) {
    // No processing instruction found
    return -1;
  }

  // Extract the substring containing the processing instruction
  const instructionSubstring = xmlString.substring(startIndex, endIndex);

  // Match the processing instruction format: <?target data?>
  const match = instructionSubstring.match(/^<\?(\s*)\s*([\s\s]*?)\s*$/);
  if (match) {
    const [fullMatch, target, data] = match;
    // Call the handler with the target and data
    handler.processingInstruction(target, data);
    // Return the index immediately after the processing instruction
    return endIndex + 2;
  }

  // Invalid processing instruction format
  return -1;
}

module.exports = parseProcessingInstruction;