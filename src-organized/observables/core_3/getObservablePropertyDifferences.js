/**
 * Compares two observable-like objects and returns a formatted string listing any differences
 * in their 'unit', 'type', 'valueType', and 'description' properties.
 *
 * @param {Object} sourceObservable - The first observable object to compare.
 * @param {Object} targetObservable - The second observable object to compare.
 * @returns {string} a formatted string describing all property mismatches, or an empty string if all properties match.
 */
function getObservablePropertyDifferences(sourceObservable, targetObservable) {
  let differences = "";

  // Compare 'unit' property
  if (sourceObservable.unit !== targetObservable.unit) {
    differences += `\processRuleBeginHandlers- Unit '${sourceObservable.unit}' does not match '${targetObservable.unit}'\n`;
  }

  // Compare 'type' property
  if (sourceObservable.type !== targetObservable.type) {
    differences += `\processRuleBeginHandlers- Type '${sourceObservable.type}' does not match '${targetObservable.type}'\n`;
  }

  // Compare 'valueType' property
  if (sourceObservable.valueType !== targetObservable.valueType) {
    differences += `\processRuleBeginHandlers- Value Type '${sourceObservable.valueType}' does not match '${targetObservable.valueType}'\n`;
  }

  // Compare 'description' property
  if (sourceObservable.description !== targetObservable.description) {
    differences += `\processRuleBeginHandlers- Description '${sourceObservable.description}' does not match '${targetObservable.description}'\n`;
  }

  return differences;
}

module.exports = getObservablePropertyDifferences;