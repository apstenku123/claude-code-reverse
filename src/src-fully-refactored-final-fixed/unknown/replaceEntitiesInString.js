/**
 * Replaces all entity patterns in the input string with their corresponding values, if entity processing is enabled.
 *
 * @param {string} inputString - The string in which entity replacements will be performed.
 * @param {Object} options - Configuration object for entity processing.
 * @param {boolean} options.processEntities - Flag indicating whether to process entity replacements.
 * @param {Array<{regex: RegExp, val: string}>} options.entities - Array of entity objects containing regex patterns and replacement values.
 * @returns {string} The resulting string after all entity replacements (if enabled).
 */
function replaceEntitiesInString(inputString, options) {
  // Check if inputString is non-empty and entity processing is enabled
  if (
    inputString &&
    inputString.length > 0 &&
    options.processEntities
  ) {
    // Iterate over each entity and perform replacement in the string
    for (let entityIndex = 0; entityIndex < options.entities.length; entityIndex++) {
      const entity = options.entities[entityIndex];
      inputString = inputString.replace(entity.regex, entity.val);
    }
  }
  return inputString;
}

module.exports = replaceEntitiesInString;