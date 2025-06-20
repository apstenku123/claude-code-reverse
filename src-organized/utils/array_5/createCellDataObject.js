/**
 * Constructs a cell data object from a notebook cell and related parameters.
 *
 * @param {Object} cell - The notebook cell object containing cell data (e.g., code, markdown).
 * @param {any} originalCellReference - The original cell reference or additional cell metadata.
 * @param {string} language - The programming language of the cell (e.g., 'python', 'javascript').
 * @returns {Object} a normalized cell data object containing cell type, source, language, execution count, and optionally outputs.
 */
function createCellDataObject(cell, originalCellReference, language) {
  // Construct the base cell data object
  const cellData = {
    cell: originalCellReference,
    cellType: cell.cell_type,
    // Join source array into a single string if necessary
    source: Array.isArray(cell.source) ? cell.source.join("") : cell.source,
    language: language,
    execution_count: cell.execution_count
  };

  // If outputs exist, map them using the formatNotebookOutput function (assumed imported elsewhere)
  if (cell.outputs?.length) {
    cellData.outputs = cell.outputs.map(formatNotebookOutput);
  }

  return cellData;
}

module.exports = createCellDataObject;