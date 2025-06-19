/**
 * Generates a text object representing a cell with its type, language, and source content.
 *
 * @param {Object} cellData - The data describing the cell to be serialized.
 * @param {string} cellData.cellType - The type of the cell (e.g., 'code', 'markdown').
 * @param {string} cellData.language - The programming language of the cell (e.g., 'python').
 * @param {string} cellData.cell - The cell identifier or tag name.
 * @param {string} cellData.source - The source content of the cell.
 * @returns {Object} An object containing the serialized cell text and its type.
 */
function createCellTextObject(cellData) {
  const cellMetaTags = [];

  // Only include cellType tag if isBlobOrFileLikeObject is not 'code'
  if (cellData.cellType !== "code") {
    cellMetaTags.push(`<cell_type>${cellData.cellType}</cell_type>`);
  }

  // If the cell is a code cell and the language is not Python, include the language tag
  if (cellData.language !== "python" && cellData.cellType === "code") {
    cellMetaTags.push(`<language>${cellData.language}</language>`);
  }

  // Construct the cell text with meta tags and source content
  const cellText = `<cell ${cellData.cell}>${cellMetaTags.join("")}${cellData.source}</cell ${cellData.cell}>`;

  return {
    text: cellText,
    type: "text"
  };
}

module.exports = createCellTextObject;
