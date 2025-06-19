/**
 * Compares two observable objects by their key properties and delegates to specific comparison functions if differences are found.
 *
 * @param {Object} sourceObservable - The first observable object to compare.
 * @param {Object} targetObservable - The second observable object to compare.
 * @returns {any} Returns the result of the delegated comparison function if a difference is found, otherwise returns an empty string.
 */
function compareObservables(sourceObservable, targetObservable) {
  // Compare valueType property; if different, delegate to getInstrumentValueTypeErrorMessage
  if (sourceObservable.valueType !== targetObservable.valueType) {
    return getInstrumentValueTypeErrorMessage(sourceObservable, targetObservable);
  }
  // Compare unit property; if different, delegate to getUnitUsageErrorMessage
  if (sourceObservable.unit !== targetObservable.unit) {
    return getUnitUsageErrorMessage(sourceObservable, targetObservable);
  }
  // Compare type property; if different, delegate to generateViewCreationInstruction
  if (sourceObservable.type !== targetObservable.type) {
    return generateViewCreationInstruction(sourceObservable, targetObservable);
  }
  // Compare description property; if different, delegate to generateViewCreationInstructions
  if (sourceObservable.description !== targetObservable.description) {
    return generateViewCreationInstructions(sourceObservable, targetObservable);
  }
  // If all properties are equal, return an empty string
  return "";
}

module.exports = compareObservables;