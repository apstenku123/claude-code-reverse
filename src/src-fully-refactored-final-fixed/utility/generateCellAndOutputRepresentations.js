/**
 * Generates an array containing the text representation of a cell and its outputs.
 *
 * This function takes a cell object, generates its text representation, and, if the cell has outputs,
 * flattens and processes each output using the provided extractTextAndImageEntries function. The result is an array where the
 * first element is the cell'createInteractionAccessor text representation, followed by the processed output representations.
 *
 * @param {Object} cell - The cell object to process. Should have an optional 'outputs' property (array).
 * @returns {Array<string>} An array containing the cell'createInteractionAccessor text representation and its outputs' representations.
 */
function generateCellAndOutputRepresentations(cell) {
  // Generate the text representation of the cell itself
  const cellTextRepresentation = createCellTextRepresentation(cell);

  // If outputs exist, process each output using extractTextAndImageEntries and flatten the result
  const outputRepresentations = cell.outputs?.flatMap(extractTextAndImageEntries);

  // Return an array with the cell text representation followed by its outputs (if any)
  return [cellTextRepresentation, ...(outputRepresentations ?? [])];
}

module.exports = generateCellAndOutputRepresentations;