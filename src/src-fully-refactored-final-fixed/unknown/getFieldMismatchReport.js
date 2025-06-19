/**
 * Compares two objects representing entities (such as units, types, etc.) and returns a formatted string listing any mismatched fields.
 *
 * @param {Object} firstEntity - The first entity to compare. Should have 'unit', 'type', 'valueType', and 'description' properties.
 * @param {Object} secondEntity - The second entity to compare. Should have 'unit', 'type', 'valueType', and 'description' properties.
 * @returns {string} a string containing a list of mismatched fields, each on a new line. Returns an empty string if all fields match.
 */
function getFieldMismatchReport(firstEntity, secondEntity) {
  let mismatchReport = "";

  // Compare 'unit' fields
  if (firstEntity.unit !== secondEntity.unit) {
    mismatchReport += `\processRuleBeginHandlers- Unit '${firstEntity.unit}' does not match '${secondEntity.unit}'\n`;
  }

  // Compare 'type' fields
  if (firstEntity.type !== secondEntity.type) {
    mismatchReport += `\processRuleBeginHandlers- Type '${firstEntity.type}' does not match '${secondEntity.type}'\n`;
  }

  // Compare 'valueType' fields
  if (firstEntity.valueType !== secondEntity.valueType) {
    mismatchReport += `\processRuleBeginHandlers- Value Type '${firstEntity.valueType}' does not match '${secondEntity.valueType}'\n`;
  }

  // Compare 'description' fields
  if (firstEntity.description !== secondEntity.description) {
    mismatchReport += `\processRuleBeginHandlers- Description '${firstEntity.description}' does not match '${secondEntity.description}'\n`;
  }

  return mismatchReport;
}

module.exports = getFieldMismatchReport;
