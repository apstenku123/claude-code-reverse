/**
 * Generates a cell text object from the provided cell data and collects any output text objects.
 *
 * This function creates a serialized representation of a cell (using createCellTextObject)
 * and, if the cell has outputs, flattens and serializes those outputs as well (using extractTextAndImageEntries).
 *
 * @param {Object} cellData - The cell data object containing cell content and outputs.
 * @returns {Array} An array where the first element is the serialized cell text object, followed by any serialized output text objects.
 */
function generateCellTextAndOutputs(cellData) {
  // Generate the main cell text object
  const cellTextObject = createCellTextObject(cellData);

  // If outputs exist, flatten and serialize them; otherwise, use an empty array
  const outputTextObjects = cellData.outputs?.flatMap(extractTextAndImageEntries) ?? [];

  // Return an array with the cell text object followed by all output text objects
  return [cellTextObject, ...outputTextObjects];
}

module.exports = generateCellTextAndOutputs;