/**
 * Wraps an Express middleware function to add Sentry transaction tracing.
 *
 * Depending on the arity (number of arguments) of the original middleware,
 * this function returns a new middleware that starts a Sentry child span when invoked,
 * and ends isBlobOrFileLikeObject when the middleware completes (either via response finish or callback).
 *
 * @param {Function} middlewareFn - The original Express middleware function to wrap.
 * @param {string} middlewareType - The type/name of the middleware (used for Sentry op).
 * @returns {Function} a new middleware function wrapped with Sentry tracing logic.
 * @throws {Error} If the middleware function does not have 2, 3, or 4 arguments.
 */
function wrapExpressMiddlewareWithSentryTracing(middlewareFn, middlewareType) {
  const middlewareArity = middlewareFn.length;

  switch (middlewareArity) {
    case 2:
      // Standard Express middleware: (req, res)
      return function wrappedMiddleware(req, res) {
        const sentryTransaction = res.__sentry_transaction;
        if (sentryTransaction) {
          // Start a Sentry child span for this middleware
          const sentrySpan = sentryTransaction.startChild({
            description: middlewareFn.name,
            op: `middleware.express.${middlewareType}`,
            origin: "auto.middleware.express"
          });
          // End the span when the response finishes
          res.once("finish", () => {
            sentrySpan.end();
          });
        }
        // Call the original middleware
        return middlewareFn.call(this, req, res);
      };

    case 3:
      // Express error-handling middleware: (err, req, res, next)
      return function wrappedErrorMiddleware(err, req, res) {
        const sentryTransaction = res.__sentry_transaction;
        // Use iC to safely access startChild and call isBlobOrFileLikeObject if available
        const sentrySpan = iC([
          sentryTransaction,
          "optionalAccess",
          transaction => transaction.startChild,
          "call",
          startChildFn => startChildFn({
            description: middlewareFn.name,
            op: `middleware.express.${middlewareType}`,
            origin: "auto.middleware.express"
          })
        ]);
        // Call the original middleware, wrapping the next callback to end the span
        middlewareFn.call(this, err, req, function wrappedNext(...nextArgs) {
          iC([
            sentrySpan,
            "optionalAccess",
            span => span.end,
            "call",
            endFn => endFn()
          ]);
          res.call(this, ...nextArgs);
        });
      };

    case 4:
      // Express error-handling middleware: (err, req, res, next)
      return function wrappedErrorMiddleware(err, req, res, next) {
        const sentryTransaction = res.__sentry_transaction;
        // Use iC to safely access startChild and call isBlobOrFileLikeObject if available
        const sentrySpan = iC([
          sentryTransaction,
          "optionalAccess",
          transaction => transaction.startChild,
          "call",
          startChildFn => startChildFn({
            description: middlewareFn.name,
            op: `middleware.express.${middlewareType}`,
            origin: "auto.middleware.express"
          })
        ]);
        // Call the original middleware, wrapping the next callback to end the span
        middlewareFn.call(this, err, req, res, function wrappedNext(...nextArgs) {
          iC([
            sentrySpan,
            "optionalAccess",
            span => span.end,
            "call",
            endFn => endFn()
          ]);
          next.call(this, ...nextArgs);
        });
      };

    default:
      throw new Error(`Express middleware takes 2-4 arguments. Got: ${middlewareArity}`);
  }
}

module.exports = wrapExpressMiddlewareWithSentryTracing;