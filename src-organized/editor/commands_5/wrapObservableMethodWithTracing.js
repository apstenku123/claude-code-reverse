/**
 * Wraps a method of an observable with tracing logic for GraphQL resolution.
 * This function replaces a method on the source observable with a wrapper that
 * starts a tracing span, executes the original method, and ensures the span ends
 * after the method completes (including async resolution).
 *
 * @param {Object} sourceObservable - The object containing the method to wrap.
 * @param {string} methodName - The name of the method to wrap on the source observable.
 * @param {string} operationName - The name of the GraphQL operation (for tracing description).
 * @param {Function} getInteractionTransaction - Function to start a new interaction transaction.
 * @returns {void}
 */
function wrapObservableMethodWithTracing(sourceObservable, methodName, operationName, getInteractionTransaction) {
  WZ.fill(sourceObservable[methodName], operationName, function (originalMethod) {
    return function (...methodArgs) {
      // Start a new tracing span for this GraphQL operation
      const currentSpan = getInteractionTransaction().getScope().getSpan();
      const tracingSpan = $attachDevtoolsToRenderer([
        currentSpan,
        "optionalAccess",
        span => span.startChild,
        "call",
        span => span({
          description: `${methodName}.${operationName}`,
          op: "graphql.resolve",
          origin: "auto.graphql.apollo"
        })
      ]);

      // Call the original method with the provided arguments
      const result = originalMethod.call(this, ...methodArgs);

      // If the result is a thenable (Promise-like), ensure the tracing span ends after resolution
      if (WZ.isThenable(result)) {
        return result.then(resolvedValue => {
          $attachDevtoolsToRenderer([
            tracingSpan,
            "optionalAccess",
            span => span.end,
            "call",
            span => span()
          ]);
          return resolvedValue;
        });
      }

      // For synchronous results, end the tracing span immediately
      $attachDevtoolsToRenderer([
        tracingSpan,
        "optionalAccess",
        span => span.end,
        "call",
        span => span()
      ]);
      return result;
    };
  });
}

module.exports = wrapObservableMethodWithTracing;