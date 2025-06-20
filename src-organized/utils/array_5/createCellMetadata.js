/**
 * Constructs a metadata object for a notebook cell, including its type, source, language, execution count, and optionally its outputs.
 *
 * @param {Object} cellData - The cell object containing cell properties such as type, source, outputs, and execution count.
 * @param {Object} originalCell - The original cell object reference (possibly for further processing or mapping).
 * @param {string} language - The programming language associated with the cell.
 * @returns {Object} a metadata object representing the cell, including outputs if present.
 */
function createCellMetadata(cellData, originalCell, language) {
  // Construct the base metadata object for the cell
  const cellMetadata = {
    cell: originalCell,
    cellType: cellData.cell_type,
    // Join source array into a string if necessary
    source: Array.isArray(cellData.source) ? cellData.source.join("") : cellData.source,
    language: language,
    execution_count: cellData.execution_count
  };

  // If outputs are present, map them using the formatNotebookOutput function and add to metadata
  if (cellData.outputs?.length) {
    cellMetadata.outputs = cellData.outputs.map(formatNotebookOutput);
  }

  return cellMetadata;
}

module.exports = createCellMetadata;