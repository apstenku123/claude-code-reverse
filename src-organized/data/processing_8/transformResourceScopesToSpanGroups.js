/**
 * Transforms a collection of resource scopes and their associated spans into a structured array.
 * Each resource is converted into an object containing its resource metadata and an array of scopeSpans,
 * where each scopeSpan groups spans by their instrumentation scope.
 *
 * @param {Object} resourceSpanMap - a map-like object where each key is a resource and each value is a collection of spans grouped by instrumentation scope.
 * @param {Object} config - Configuration object passed to the span transformation function.
 * @returns {Array<Object>} An array of objects, each representing a resource and its associated scopeSpans.
 */
function transformResourceScopesToSpanGroups(resourceSpanMap, config) {
  const resourceMap = groupEntriesByResourceAndScope(resourceSpanMap); // Normalize or convert input to a Map
  const result = [];
  const resourceEntriesIterator = resourceMap.entries();
  let resourceEntry = resourceEntriesIterator.next();

  while (!resourceEntry.done) {
    const [resource, scopeSpanGroups] = resourceEntry.value;
    const scopeSpans = [];
    const scopeSpanGroupsIterator = scopeSpanGroups.values();
    let scopeSpanGroupEntry = scopeSpanGroupsIterator.next();

    // Iterate over each group of spans for a given instrumentation scope
    while (!scopeSpanGroupEntry.done) {
      const spanGroup = scopeSpanGroupEntry.value;
      if (spanGroup.length > 0) {
        // Transform each span in the group using serializeSpanToExportFormat and config
        const transformedSpans = spanGroup.map(span => serializeSpanToExportFormat(span, config));
        scopeSpans.push({
          scope: Gs.createInstrumentationScope(spanGroup[0].instrumentationScope),
          spans: transformedSpans,
          schemaUrl: spanGroup[0].instrumentationScope.schemaUrl
        });
      }
      scopeSpanGroupEntry = scopeSpanGroupsIterator.next();
    }

    // Create the resource-level object with its associated scopeSpans
    const resourceSpanObject = {
      resource: Gs.createResource(resource),
      scopeSpans: scopeSpans,
      schemaUrl: undefined
    };
    result.push(resourceSpanObject);
    resourceEntry = resourceEntriesIterator.next();
  }
  return result;
}

module.exports = transformResourceScopesToSpanGroups;