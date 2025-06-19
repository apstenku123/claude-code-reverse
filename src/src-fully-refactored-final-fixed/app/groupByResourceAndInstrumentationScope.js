/**
 * Groups input items by their resource and instrumentation scope (name, version, schemaUrl).
 *
 * @param {Array<Object>} items - Array of objects, each containing a 'resource' property and an 'instrumentationScope' object.
 * @returns {Map<any, Map<string, Array<Object>>>} a nested Map: resource → (instrumentationScopeKey → array of items)
 *
 * The instrumentationScopeKey is a string in the format: `${name}@${version}:${schemaUrl}`
 */
function groupByResourceAndInstrumentationScope(items) {
  // Outer map: resource → (inner map)
  const resourceMap = new Map();

  for (const item of items) {
    // Destructure resource and instrumentationScope properties
    const {
      resource,
      instrumentationScope: {
        name: scopeName,
        version: scopeVersion = "",
        schemaUrl: scopeSchemaUrl = ""
      }
    } = item;

    // Get or create the inner map for this resource
    let scopeMap = resourceMap.get(resource);
    if (!scopeMap) {
      scopeMap = new Map();
      resourceMap.set(resource, scopeMap);
    }

    // Create a unique key for the instrumentation scope
    const scopeKey = `${scopeName}@${scopeVersion}:${scopeSchemaUrl}`;

    // Get or create the array for this scope key
    let groupedItems = scopeMap.get(scopeKey);
    if (!groupedItems) {
      groupedItems = [];
      scopeMap.set(scopeKey, groupedItems);
    }

    // Add the current item to the grouped array
    groupedItems.push(item);
  }

  return resourceMap;
}

module.exports = groupByResourceAndInstrumentationScope;