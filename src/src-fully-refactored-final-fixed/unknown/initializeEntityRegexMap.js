/**
 * Initializes or updates the lastEntities map with regex patterns and values for each entity.
 *
 * For each key in the provided entities object, this function creates a regex that matches the HTML entity (e.g., &amp;key;) globally,
 * and stores both the regex and the corresponding value in the `lastEntities` property of the current instance.
 *
 * @param {Object.<string, string>} entities - An object mapping entity names to their replacement values.
 * @returns {void}
 */
function initializeEntityRegexMap(entities) {
  const entityKeys = Object.keys(entities);
  for (let index = 0; index < entityKeys.length; index++) {
    const entityName = entityKeys[index];
    // Store a regex to match the HTML entity (e.g., &entityName;) and its replacement value
    this.lastEntities[entityName] = {
      regex: new RegExp("&" + entityName + ";", "g"),
      val: entities[entityName]
    };
  }
}

module.exports = initializeEntityRegexMap;