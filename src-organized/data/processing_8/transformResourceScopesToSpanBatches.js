/**
 * Transforms a nested resource-scope-span structure into an array of span batch objects.
 *
 * @param {Object} resourceScopeMap - a nested map/object containing resources as keys and their associated scopes as values.
 * @param {Object} config - Configuration object passed to the span transformation function.
 * @returns {Array<Object>} An array of span batch objects, each containing resource, scopeSpans, and schemaUrl.
 */
function transformResourceScopesToSpanBatches(resourceScopeMap, config) {
  // Get the resource-to-scopes mapping (possibly a Map or object)
  const resourceToScopes = groupEntriesByResourceAndScope(resourceScopeMap);
  const spanBatches = [];
  const resourceEntriesIterator = resourceToScopes.entries();
  let resourceEntry = resourceEntriesIterator.next();

  // Iterate over each resource and its associated scopes
  while (!resourceEntry.done) {
    const [resource, scopes] = resourceEntry.value;
    const scopeSpans = [];
    const scopeValuesIterator = scopes.values();
    let scopeValueEntry = scopeValuesIterator.next();

    // Iterate over each scope (array of spans)
    while (!scopeValueEntry.done) {
      const spanArray = scopeValueEntry.value;
      if (spanArray.length > 0) {
        // Transform each span using serializeSpanToExportFormat and the provided config
        const transformedSpans = spanArray.map(span => serializeSpanToExportFormat(span, config));
        scopeSpans.push({
          scope: Gs.createInstrumentationScope(spanArray[0].instrumentationScope),
          spans: transformedSpans,
          schemaUrl: spanArray[0].instrumentationScope.schemaUrl
        });
      }
      scopeValueEntry = scopeValuesIterator.next();
    }

    // Construct the span batch object for this resource
    const spanBatch = {
      resource: Gs.createResource(resource),
      scopeSpans: scopeSpans,
      schemaUrl: undefined
    };
    spanBatches.push(spanBatch);
    resourceEntry = resourceEntriesIterator.next();
  }

  return spanBatches;
}

module.exports = transformResourceScopesToSpanBatches;