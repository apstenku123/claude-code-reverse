/**
 * Groups an array of entries by their resource and instrumentation scope.
 *
 * Each entry is grouped first by its `resource` property, then by a composite key
 * consisting of the instrumentation scope'createInteractionAccessor name, version, and schema URL.
 *
 * @param {Array<Object>} entries - Array of entries to group. Each entry must have a `resource` property and an `instrumentationScope` object with `name`, `version`, and `schemaUrl`.
 * @returns {Map<any, Map<string, Array<Object>>>} a nested Map: resource => (instrumentationScopeKey => [entries])
 */
function groupEntriesByResourceAndInstrumentationScope(entries) {
  const resourceMap = new Map();

  for (const entry of entries) {
    // Get or create the map for this resource
    let instrumentationScopeMap = resourceMap.get(entry.resource);
    if (!instrumentationScopeMap) {
      instrumentationScopeMap = new Map();
      resourceMap.set(entry.resource, instrumentationScopeMap);
    }

    // Build a unique key for the instrumentation scope
    const instrumentationScope = entry.instrumentationScope;
    const instrumentationScopeKey = `${instrumentationScope.name}@${instrumentationScope.version || ""}:${instrumentationScope.schemaUrl || ""}`;

    // Get or create the array for this instrumentation scope key
    let groupedEntries = instrumentationScopeMap.get(instrumentationScopeKey);
    if (!groupedEntries) {
      groupedEntries = [];
      instrumentationScopeMap.set(instrumentationScopeKey, groupedEntries);
    }

    // Add the current entry to the appropriate group
    groupedEntries.push(entry);
  }

  return resourceMap;
}

module.exports = groupEntriesByResourceAndInstrumentationScope;