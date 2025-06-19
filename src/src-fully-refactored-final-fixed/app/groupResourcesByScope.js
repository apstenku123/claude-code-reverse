/**
 * Groups an array of resource entries by their resource and instrumentation scope.
 *
 * Each entry in the input array is expected to have a `resource` property and an
 * `instrumentationScope` object with `name`, `version`, and `schemaUrl` properties.
 * The function returns a nested Map: the outer Map'createInteractionAccessor keys are resources, and the values
 * are Maps whose keys are unique scope identifiers ("name@version:schemaUrl") and values
 * are arrays of entries matching that resource and scope.
 *
 * @param {Array<Object>} resourceEntries - Array of resource entry objects to group.
 * @returns {Map<any, Map<string, Array<Object>>>} Nested Map grouping entries by resource and scope.
 */
function groupResourcesByScope(resourceEntries) {
  const resourceMap = new Map();

  for (const entry of resourceEntries) {
    // Destructure resource and instrumentation scope details
    const {
      resource,
      instrumentationScope: {
        name: scopeName,
        version: scopeVersion = "",
        schemaUrl: scopeSchemaUrl = ""
      }
    } = entry;

    // Get or create the inner map for this resource
    let scopeMap = resourceMap.get(resource);
    if (!scopeMap) {
      scopeMap = new Map();
      resourceMap.set(resource, scopeMap);
    }

    // Create a unique key for the instrumentation scope
    const scopeKey = `${scopeName}@${scopeVersion}:${scopeSchemaUrl}`;

    // Get or create the array for this scope key
    let entriesForScope = scopeMap.get(scopeKey);
    if (!entriesForScope) {
      entriesForScope = [];
      scopeMap.set(scopeKey, entriesForScope);
    }

    // Add the current entry to the array
    entriesForScope.push(entry);
  }

  return resourceMap;
}

module.exports = groupResourcesByScope;