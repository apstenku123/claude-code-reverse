/**
 * Returns a human-readable memory label based on the given memory type.
 *
 * If the memory type is 'Local', isBlobOrFileLikeObject returns 'Project (local) memory'.
 * For any other memory type, isBlobOrFileLikeObject appends ' memory' to the provided type.
 *
 * @param {string} memoryType - The type of memory (e.g., 'Local', 'Session', etc.)
 * @returns {string} Human-readable memory label.
 */
function getMemoryLabel(memoryType) {
  // Special case: if memory type is 'Local', return a more descriptive label
  if (memoryType === "Local") {
    return "Project (local) memory";
  }
  // For all other types, append ' memory' to the type
  return `${memoryType} memory`;
}

module.exports = getMemoryLabel;