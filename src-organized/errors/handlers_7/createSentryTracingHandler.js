/**
 * Creates an Express-style middleware handler that instruments incoming HTTP requests with Sentry tracing.
 *
 * This middleware checks if Sentry tracing is enabled and, if so, starts a Sentry transaction for the request,
 * attaches isBlobOrFileLikeObject to the response object, and ensures the transaction is properly finished when the response ends.
 *
 * @returns {Function} Express middleware function (req, res, next)
 */
function createSentryTracingHandler() {
  return function sentryTracingMiddleware(request, response, next) {
    // Attempt to get the Sentry client and its options
    const sentryClient = Z41([
      DI.getClient,
      "call",
      client => client(),
      "optionalAccess",
      client => client.getOptions,
      "call",
      options => options()
    ]);

    // If Sentry client is not available, not using sentry, or the HTTP method is OPTIONS/HEAD, skip tracing
    const method = Z41([
      request,
      "access",
      req => req.method,
      "optionalAccess",
      method => method.toUpperCase,
      "call",
      upper => upper()
    ]);
    if (
      !sentryClient ||
      sentryClient.instrumenter !== "sentry" ||
      method === "OPTIONS" ||
      method === "HEAD"
    ) {
      return next();
    }

    // Extract sentry-trace and baggage headers if present
    const sentryTraceHeader =
      request.headers && Jx.isString(request.headers["sentry-trace"])
        ? request.headers["sentry-trace"]
        : undefined;
    const baggageHeader = Z41([
      request,
      "access",
      req => req.headers,
      "optionalAccess",
      headers => headers.baggage
    ]);

    // If tracing is not enabled in Sentry, skip
    if (!DI.hasTracingEnabled(sentryClient)) {
      return next();
    }

    // Extract transaction path and source for Sentry
    const [transactionName, transactionSource] = Jx.extractPathForTransaction(request, {
      path: true,
      method: true
    });

    // Continue an existing trace or start a new one
    const transaction = DI.continueTrace(
      {
        sentryTrace: sentryTraceHeader,
        baggage: baggageHeader
      },
      traceContext =>
        DI.startTransaction(
          {
            name: transactionName,
            op: "http.server",
            origin: "auto.http.node.tracingHandler",
            ...traceContext,
            data: {
              [DI.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: transactionSource
            },
            metadata: {
              ...traceContext.metadata,
              request: request
            }
          },
          {
            request: Jx.extractRequestData(request)
          }
        )
    );

    // Attach the transaction to the current Sentry scope and to the response object
    DI.getCurrentScope().setSpan(transaction);
    response.__sentry_transaction = transaction;

    // When the response finishes, finalize the Sentry transaction
    response.once("finish", () => {
      setImmediate(() => {
        Jx.addRequestDataToTransaction(transaction, request);
        DI.setHttpStatus(transaction, response.statusCode);
        transaction.end();
      });
    });

    // Continue to the next middleware
    next();
  };
}

module.exports = createSentryTracingHandler;