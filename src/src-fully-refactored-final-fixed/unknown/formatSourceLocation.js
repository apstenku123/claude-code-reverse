/**
 * Formats a source location string from an object containing system updateSnapshotAndNotify, line number, and column number.
 *
 * @param {Object} sourceLocation - Object containing source location information.
 * @param {string} [sourceLocation.systemId] - The system identifier (e.g., filename or URI).
 * @param {number} [sourceLocation.lineNumber] - The line number in the source.
 * @param {number} [sourceLocation.columnNumber] - The column number in the source.
 * @returns {string|undefined} a formatted string representing the source location, or undefined if input is falsy.
 */
function formatSourceLocation(sourceLocation) {
  // Only format if sourceLocation is provided
  if (sourceLocation) {
    // Use empty string if systemId is not provided
    const systemId = sourceLocation.systemId || "";
    const lineNumber = sourceLocation.lineNumber;
    const columnNumber = sourceLocation.columnNumber;
    // Construct the formatted string
    return `\n@${systemId}#[line:${lineNumber},col:${columnNumber}]`;
  }
  // Return undefined if no sourceLocation is provided
}

module.exports = formatSourceLocation;