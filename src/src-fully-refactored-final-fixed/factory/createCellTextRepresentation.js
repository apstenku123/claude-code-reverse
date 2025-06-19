/**
 * Generates a text representation of a cell object, including cell type, language, and source content.
 *
 * @param {Object} cellData - The cell data object containing cellType, language, cell, and source properties.
 * @param {string} cellData.cellType - The type of the cell (e.g., 'code', 'markdown').
 * @param {string} cellData.language - The programming language of the cell (e.g., 'python').
 * @param {string} cellData.cell - The cell identifier or tag.
 * @param {string} cellData.source - The source content of the cell.
 * @returns {Object} An object containing the generated text representation and its type.
 */
function createCellTextRepresentation(cellData) {
  const cellMetaTags = [];

  // Add cell type tag if isBlobOrFileLikeObject'createInteractionAccessor not 'code'
  if (cellData.cellType !== "code") {
    cellMetaTags.push(`<cell_type>${cellData.cellType}</cell_type>`);
  }

  // Add language tag if cell is 'code' but language is not 'python'
  if (cellData.language !== "python" && cellData.cellType === "code") {
    cellMetaTags.push(`<language>${cellData.language}</language>`);
  }

  // Construct the full cell text representation
  const cellText = `<cell ${cellData.cell}>${cellMetaTags.join("")}${cellData.source}</cell ${cellData.cell}>`;

  return {
    text: cellText,
    type: "text"
  };
}

module.exports = createCellTextRepresentation;
