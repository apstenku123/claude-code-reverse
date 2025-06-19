/**
 * Creates a tRPC middleware that integrates Sentry tracing and error capturing.
 *
 * @param {Object} [options={}] - Middleware options.
 * @param {boolean} [options.attachRpcInput] - Whether to attach the raw input to Sentry context.
 * @returns {Function} Middleware function for tRPC procedure calls.
 */
function createTrpcSentryMiddleware(options = {}) {
  /**
   * Middleware for tRPC that traces the procedure and captures exceptions in Sentry.
   *
   * @param {Object} context - Middleware context.
   * @param {string} context.path - The tRPC procedure path.
   * @param {string} context.type - The tRPC procedure type (query, mutation, etc).
   * @param {Function} context.next - The next middleware or resolver function.
   * @param {any} context.rawInput - The raw input provided to the procedure.
   * @returns {any} The result of the next middleware/resolver.
   */
  return function ({
    path,
    type,
    next,
    rawInput
  }) {
    // Retrieve Sentry client options, if available
    const sentryClientOptions = GDA([
      Fx.getClient,
      "call",
      client => client(),
      "optionalAccess",
      client => client.getOptions,
      "call",
      optionsFn => optionsFn()
    ]);

    // Get the current Sentry transaction (if any)
    const currentTransaction = Fx.getCurrentScope().getTransaction();

    if (currentTransaction) {
      // Update transaction name and attributes for tRPC
      currentTransaction.updateName(`trpc/${path}`);
      currentTransaction.setAttribute(Fx.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "route");
      currentTransaction.op = "rpc.server";

      // Prepare context for Sentry
      const trpcContext = {
        procedure_type: type
      };

      // Attach input if configured
      const shouldAttachInput = options.attachRpcInput !== undefined
        ? options.attachRpcInput
        : GDA([
            sentryClientOptions,
            "optionalAccess",
            opts => opts.sendDefaultPii
          ]);
      if (shouldAttachInput) {
        trpcContext.input = ZDA.normalize(rawInput);
      }
      currentTransaction.setContext("trpc", trpcContext);
    }

    /**
     * Handles the result of the tRPC call, capturing errors in Sentry if present.
     *
     * @param {Object} result - The result object from tRPC.
     * @param {boolean} result.ok - Whether the call was successful.
     * @param {Error} [result.error] - The error, if any.
     */
    function handleTrpcResult(result) {
      if (!result.ok) {
        Fx.captureException(result.error, {
          mechanism: {
            handled: false,
            data: {
              function: "trpcMiddleware"
            }
          }
        });
      }
    }

    let result;
    try {
      // Call the next middleware/resolver
      result = next();
    } catch (error) {
      // Capture synchronous errors in Sentry and rethrow
      Fx.captureException(error, {
        mechanism: {
          handled: false,
          data: {
            function: "trpcMiddleware"
          }
        }
      });
      throw error;
    }

    // If the result is a Promise (thenable), attach error/result handlers
    if (ZDA.isThenable(result)) {
      Promise.resolve(result).then(
        handleTrpcResult,
        error => {
          Fx.captureException(error, {
            mechanism: {
              handled: false,
              data: {
                function: "trpcMiddleware"
              }
            }
          });
        }
      );
    } else {
      handleTrpcResult(result);
    }

    // Always return the result (sync or async)
    return result;
  };
}

module.exports = createTrpcSentryMiddleware;
