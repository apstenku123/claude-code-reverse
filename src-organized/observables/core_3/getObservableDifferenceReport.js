/**
 * Compares two observable configuration objects and returns a formatted string listing any differences in their key properties.
 *
 * @param {Object} sourceObservable - The first observable configuration to compare.
 * @param {Object} targetObservable - The second observable configuration to compare against.
 * @returns {string} a formatted string describing all differences found, or an empty string if no differences exist.
 */
function getObservableDifferenceReport(sourceObservable, targetObservable) {
  let differenceReport = "";

  // Compare 'unit' property
  if (sourceObservable.unit !== targetObservable.unit) {
    differenceReport += `\processRuleBeginHandlers- Unit '${sourceObservable.unit}' does not match '${targetObservable.unit}'\n`;
  }

  // Compare 'type' property
  if (sourceObservable.type !== targetObservable.type) {
    differenceReport += `\processRuleBeginHandlers- Type '${sourceObservable.type}' does not match '${targetObservable.type}'\n`;
  }

  // Compare 'valueType' property
  if (sourceObservable.valueType !== targetObservable.valueType) {
    differenceReport += `\processRuleBeginHandlers- Value Type '${sourceObservable.valueType}' does not match '${targetObservable.valueType}'\n`;
  }

  // Compare 'description' property
  if (sourceObservable.description !== targetObservable.description) {
    differenceReport += `\processRuleBeginHandlers- Description '${sourceObservable.description}' does not match '${targetObservable.description}'\n`;
  }

  return differenceReport;
}

module.exports = getObservableDifferenceReport;