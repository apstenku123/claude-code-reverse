/**
 * Transforms a collection of resource span observables into a structured array of resource span objects.
 * Each resource is mapped to its associated instrumentation scopes and spans, applying a transformation function to each span.
 *
 * @param {Object} resourceSpanObservables - a map-like object where each key is a resource and each value is a collection of instrumentation scopes with their spans.
 * @param {Object} config - Configuration object passed to the span transformation function.
 * @returns {Array<Object>} An array of resource span objects, each containing resource metadata and associated scope spans.
 */
function transformResourceSpans(resourceSpanObservables, config) {
  const resourceSpanMap = groupEntriesByResourceAndScope(resourceSpanObservables); // Get a map of resources to their span collections
  const transformedResourceSpans = [];
  const resourceEntriesIterator = resourceSpanMap.entries();
  let resourceEntry = resourceEntriesIterator.next();

  // Iterate over each resource entry
  while (!resourceEntry.done) {
    const [resource, instrumentationScopesMap] = resourceEntry.value;
    const scopeSpans = [];
    const instrumentationScopesIterator = instrumentationScopesMap.values();
    let instrumentationScopeEntry = instrumentationScopesIterator.next();

    // Iterate over each instrumentation scope for the resource
    while (!instrumentationScopeEntry.done) {
      const spansArray = instrumentationScopeEntry.value;
      if (spansArray.length > 0) {
        // Transform each span using the serializeSpanToExportFormat function and config
        const transformedSpans = spansArray.map(span => serializeSpanToExportFormat(span, config));
        scopeSpans.push({
          scope: Gs.createInstrumentationScope(spansArray[0].instrumentationScope),
          spans: transformedSpans,
          schemaUrl: spansArray[0].instrumentationScope.schemaUrl
        });
      }
      instrumentationScopeEntry = instrumentationScopesIterator.next();
    }

    // Build the resource span object
    const resourceSpanObject = {
      resource: Gs.createResource(resource),
      scopeSpans: scopeSpans,
      schemaUrl: undefined
    };
    transformedResourceSpans.push(resourceSpanObject);
    resourceEntry = resourceEntriesIterator.next();
  }

  return transformedResourceSpans;
}

module.exports = transformResourceSpans;