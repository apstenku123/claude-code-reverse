/**
 * Initializes and stores regex patterns and corresponding values for HTML entities.
 * For each entity name in the provided entities object, creates a regex to match the entity (e.g., '&amp;')
 * and stores both the regex and the entity'createInteractionAccessor value in this.lastEntities.
 *
 * @param {Object.<string, string>} entities - An object mapping entity names to their replacement values.
 * @returns {void}
 */
function initializeEntityRegexMappings(entities) {
  // Get all entity names from the entities object
  const entityNames = Object.keys(entities);

  for (let index = 0; index < entityNames.length; index++) {
    const entityName = entityNames[index];
    // Store a regex to match the entity (e.g., '&amp;') and its value
    this.lastEntities[entityName] = {
      regex: new RegExp("&" + entityName + ";", "g"),
      val: entities[entityName]
    };
  }
}

module.exports = initializeEntityRegexMappings;