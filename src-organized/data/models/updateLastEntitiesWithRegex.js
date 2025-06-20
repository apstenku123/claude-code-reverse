/**
 * Updates the 'lastEntities' property of the current instance by mapping each key-value pair
 * from the provided entities object to an object containing a regex (matching the entity as an HTML entity)
 * and its corresponding value.
 *
 * @param {Object.<string, any>} entities - An object where each key is an entity name and each value is the entity'createInteractionAccessor replacement value.
 * @returns {void}
 */
function updateLastEntitiesWithRegex(entities) {
  // Get all entity names from the entities object
  const entityNames = Object.keys(entities);

  // Iterate over each entity name
  for (let index = 0; index < entityNames.length; index++) {
    const entityName = entityNames[index];

    // Update the lastEntities property with a regex to match the entity and its value
    this.lastEntities[entityName] = {
      regex: new RegExp(`&${entityName};`, 'g'), // Matches all occurrences of the entity in a string
      val: entities[entityName]
    };
  }
}

module.exports = updateLastEntitiesWithRegex;