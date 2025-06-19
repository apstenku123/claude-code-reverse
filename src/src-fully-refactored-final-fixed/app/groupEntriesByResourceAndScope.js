/**
 * Groups entries by their resource and instrumentation scope (name, version, schemaUrl).
 *
 * @param {Array<Object>} entries - Array of entries, each containing a `resource` and an `instrumentationScope` object.
 * @returns {Map<any, Map<string, Array<Object>>>} - a nested Map: outer key is resource, inner key is a string combining scope name, version, and schemaUrl, value is an array of matching entries.
 */
function groupEntriesByResourceAndScope(entries) {
  const groupedByResource = new Map();

  for (const entry of entries) {
    // Destructure resource and instrumentationScope properties
    const {
      resource,
      instrumentationScope: {
        name: scopeName,
        version: scopeVersion = "",
        schemaUrl: scopeSchemaUrl = ""
      }
    } = entry;

    // Get or create the map for this resource
    let scopeMap = groupedByResource.get(resource);
    if (!scopeMap) {
      scopeMap = new Map();
      groupedByResource.set(resource, scopeMap);
    }

    // Create a unique key for the scope
    const scopeKey = `${scopeName}@${scopeVersion}:${scopeSchemaUrl}`;

    // Get or create the array for this scope key
    let entriesArray = scopeMap.get(scopeKey);
    if (!entriesArray) {
      entriesArray = [];
      scopeMap.set(scopeKey, entriesArray);
    }

    // Add the current entry to the array
    entriesArray.push(entry);
  }

  return groupedByResource;
}

module.exports = groupEntriesByResourceAndScope;