/**
 * Combines the configuration derived from the source observable with any mapped outputs.
 *
 * This utility function takes an input object (typically an observable or configuration object),
 * generates a configuration using createCellTextObject, and, if present, maps its 'outputs' property using extractTextAndImageEntries.
 * The result is an array containing the configuration as the first element, followed by any mapped outputs.
 *
 * @param {Object} sourceObservable - The input object containing configuration and optional outputs.
 * @returns {Array} An array with the configuration as the first element, followed by mapped outputs (if any).
 */
function combineConfigWithOutputMappings(sourceObservable) {
  // Generate configuration from the source observable
  const config = createCellTextObject(sourceObservable);

  // If 'outputs' exist, map each output using extractTextAndImageEntries and flatten the result
  const mappedOutputs = sourceObservable.outputs?.flatMap(extractTextAndImageEntries);

  // Return an array with the config first, then all mapped outputs (if any)
  return [config, ...(mappedOutputs ?? [])];
}

module.exports = combineConfigWithOutputMappings;