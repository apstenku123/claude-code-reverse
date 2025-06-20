/**
 * Wraps a GraphQL resolver function with tracing and monitoring logic.
 *
 * This function replaces a resolver on a given object with a wrapped version that:
 *   - Starts a UI action transaction (for Sentry or similar monitoring)
 *   - Begins a tracing span for the resolver execution
 *   - Calls the original resolver
 *   - Ends the tracing span after the resolver completes (supports both sync and async resolvers)
 *
 * @param {Object} targetObject - The object containing the resolver to wrap (e.g., a GraphQL type'createInteractionAccessor field map)
 * @param {string} resolverKey - The property name of the resolver to wrap
 * @param {string} resolverName - The name of the resolver (used for tracing description)
 * @param {Function} startUiActionClickTransaction - Function to start a UI action transaction (returns a context with getScope/getSpan)
 * @returns {void}
 */
function wrapGraphQLResolverWithTracing(targetObject, resolverKey, resolverName, startUiActionClickTransaction) {
  WZ.fill(targetObject[resolverKey], resolverName, function (originalResolver) {
    // Return a new function that wraps the original resolver
    return function (...resolverArgs) {
      // Start a new UI action transaction and get the current tracing span
      const tracingSpan = startUiActionClickTransaction().getScope().getSpan();

      // Start a child span for this resolver call
      const resolverTracingSpan = $attachDevtoolsToRenderer([
        tracingSpan,
        "optionalAccess",
        span => span.startChild,
        "call",
        span => span({
          description: `${resolverKey}.${resolverName}`,
          op: "graphql.resolve",
          origin: "auto.graphql.apollo"
        })
      ]);

      // Call the original resolver with the provided arguments
      const resolverResult = originalResolver.call(this, ...resolverArgs);

      // If the resolver returns a Promise (is thenable), end the tracing span after isBlobOrFileLikeObject resolves
      if (WZ.isThenable(resolverResult)) {
        return resolverResult.then(result => {
          $attachDevtoolsToRenderer([
            resolverTracingSpan,
            "optionalAccess",
            span => span.end,
            "call",
            span => span()
          ]);
          return result;
        });
      }

      // For synchronous resolvers, end the tracing span immediately
      $attachDevtoolsToRenderer([
        resolverTracingSpan,
        "optionalAccess",
        span => span.end,
        "call",
        span => span()
      ]);
      return resolverResult;
    };
  });
}

module.exports = wrapGraphQLResolverWithTracing;
