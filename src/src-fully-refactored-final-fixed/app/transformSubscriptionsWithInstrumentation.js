/**
 * Transforms an array of subscription objects by creating instrumentation scopes and processing their metrics.
 *
 * @param {Array<Object>} subscriptions - Array of subscription objects, each containing a scope and metrics.
 * @param {any} config - Configuration object passed to the metric transformation function.
 * @returns {Array<Object>} Array of transformed subscription objects with instrumentation scopes and processed metrics.
 */
function transformSubscriptionsWithInstrumentation(subscriptions, config) {
  return Array.from(
    subscriptions.map(subscription => ({
      // Create a new instrumentation scope for each subscription'createInteractionAccessor scope
      scope: Is.createInstrumentationScope(subscription.scope),
      // Transform each metric using the formatMetricData function and the provided config
      metrics: subscription.metrics.map(metric => formatMetricData(metric, config)),
      // Preserve the schemaUrl from the original scope
      schemaUrl: subscription.scope.schemaUrl
    }))
  );
}

module.exports = transformSubscriptionsWithInstrumentation;