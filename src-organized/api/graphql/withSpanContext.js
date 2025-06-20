/**
 * Sets a span context on the provided subscription and executes a configuration callback within that context.
 *
 * @param {any} spanContext - The span context to set on the subscription (e.g., for tracing or logging).
 * @param {function} configureSubscription - a callback function that receives the subscription object and performs additional configuration or logic.
 * @returns {any} The result of the withOptionalScope function, which wraps the subscription logic.
 */
function withSpanContext(spanContext, configureSubscription) {
  return withOptionalScope(subscription => {
    // Set the provided span context on the subscription (for tracing, etc.)
    subscription.setSpan(spanContext);
    // Execute the configuration callback with the subscription
    return configureSubscription(subscription);
  });
}

module.exports = withSpanContext;