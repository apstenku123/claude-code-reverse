/**
 * Extracts permission rules from a given source object and formats them into a standardized array of rule objects.
 *
 * @param {Object} sourceObject - The object containing permissions to extract.
 * @param {any} sourceIdentifier - The identifier to associate with each extracted rule (e.g., the source of the permissions).
 * @returns {Array<Object>} An array of rule objects, each containing the source, rule behavior, and processed rule value.
 */
function extractPermissionRules(sourceObject, sourceIdentifier) {
  // If the source object or its permissions property is missing, return an empty array
  if (!sourceObject || !sourceObject.permissions) return [];

  const { permissions } = sourceObject;
  const extractedRules = [];

  // Iterate over all possible rule behaviors defined in the _a9 array
  for (const ruleBehavior of _a9) {
    const ruleValues = permissions[ruleBehavior];
    // If there are rule values for this behavior, process each one
    if (ruleValues) {
      for (const ruleValue of ruleValues) {
        extractedRules.push({
          source: sourceIdentifier,
          ruleBehavior: ruleBehavior,
          ruleValue: parseToolNameAndRuleContent(ruleValue) // Process the rule value using the parseToolNameAndRuleContent function
        });
      }
    }
  }

  return extractedRules;
}

module.exports = extractPermissionRules;