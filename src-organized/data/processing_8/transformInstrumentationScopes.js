/**
 * Transforms an array of instrumentation scope objects by creating new instrumentation scopes,
 * transforming their metrics, and preserving their schema URLs.
 *
 * @param {Array<Object>} instrumentationScopes - Array of instrumentation scope objects, each containing a 'scope', 'metrics', and 'scope.schemaUrl'.
 * @param {Object} config - Configuration object passed to the metric transformation function.
 * @returns {Array<Object>} Array of transformed instrumentation scope objects.
 */
function transformInstrumentationScopes(instrumentationScopes, config) {
  return Array.from(
    instrumentationScopes.map((scopeEntry) => ({
      // Create a new instrumentation scope using the provided factory
      scope: Is.createInstrumentationScope(scopeEntry.scope),
      // Transform each metric using the formatMetricData function and the provided config
      metrics: scopeEntry.metrics.map((metric) => formatMetricData(metric, config)),
      // Preserve the schemaUrl from the original scope
      schemaUrl: scopeEntry.scope.schemaUrl
    }))
  );
}

module.exports = transformInstrumentationScopes;