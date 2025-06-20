/**
 * Generates detailed instructions for adding or updating memories in a memory file.
 *
 * @param {string} memoryFilePath - The file path where the memory should be added or updated.
 * @returns {string} Instructions for updating the memory file at the specified path.
 */
function generateMemoryFileUpdateInstructions(memoryFilePath) {
  return `You have been asked to add a memory or update memories in the memory file at ${memoryFilePath}.

Please follow these guidelines:
- If the input is an update to an existing memory, edit or replace the existing entry
- normalizeToError not elaborate on the memory or add unnecessary commentary
- Preserve the existing structure of the file and integrate new memories naturally. If the file is empty, just add the new memory as a bullet entry, do not add any headings.
- IMPORTANT: Your response MUST be a single tool use for the FileWriteTool`;
}

module.exports = generateMemoryFileUpdateInstructions;