/**
 * Generates a formatted text representation of a code cell, including cell type, language, and source content.
 *
 * @param {Object} cellData - The data representing the cell to be formatted.
 * @param {string} cellData.cellType - The type of the cell (e.g., 'code', 'markdown').
 * @param {string} cellData.language - The programming language of the cell (e.g., 'python').
 * @param {string} cellData.cell - The identifier or name of the cell.
 * @param {string} cellData.source - The source code or content of the cell.
 * @returns {Object} An object containing the formatted cell text and its type.
 */
function createPythonCellText(cellData) {
  const cellMetadata = [];

  // Add cell type metadata if isBlobOrFileLikeObject is not 'code'
  if (cellData.cellType !== "code") {
    cellMetadata.push(`<cell_type>${cellData.cellType}</cell_type>`);
  }

  // Add language metadata if the language is not 'python' and cell type is 'code'
  if (cellData.language !== "python" && cellData.cellType === "code") {
    cellMetadata.push(`<language>${cellData.language}</language>`);
  }

  // Construct the final cell text with metadata and source
  const cellText = `<cell ${cellData.cell}>${cellMetadata.join("")}${cellData.source}</cell ${cellData.cell}>`;

  return {
    text: cellText,
    type: "text"
  };
}

module.exports = createPythonCellText;
