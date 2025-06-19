/**
 * Creates a tRPC middleware that integrates with Sentry for transaction tracing and error capturing.
 *
 * @param {Object} [options={}] - Configuration options for the middleware.
 * @param {boolean} [options.attachRpcInput] - Whether to attach the raw RPC input to the Sentry context.
 * @returns {Function} Middleware function to be used in tRPC router.
 */
function createTrpcSentryMiddleware(options = {}) {
  /**
   * Middleware function for tRPC that traces transactions and captures errors in Sentry.
   *
   * @param {Object} context - The tRPC middleware context.
   * @param {string} context.path - The tRPC procedure path.
   * @param {string} context.type - The tRPC procedure type (e.g., 'query', 'mutation').
   * @param {Function} context.next - The next middleware or resolver to call.
   * @param {any} context.rawInput - The raw input provided to the tRPC procedure.
   * @returns {any|Promise<any>} The result of the next middleware or resolver.
   */
  return function ({
    path: procedurePath,
    type: procedureType,
    next: callNext,
    rawInput: rawProcedureInput
  }) {
    // Retrieve Sentry options from the client, if available
    const sentryOptions = GDA([
      Fx.getClient,
      "call",
      client => client(),
      "optionalAccess",
      client => client.getOptions,
      "call",
      getOptions => getOptions()
    ]);

    // Get the current Sentry transaction (if any)
    const currentTransaction = Fx.getCurrentScope().getTransaction();

    if (currentTransaction) {
      // Update transaction name and attributes for tRPC
      currentTransaction.updateName(`trpc/${procedurePath}`);
      currentTransaction.setAttribute(Fx.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "route");
      currentTransaction.op = "rpc.server";

      // Prepare context for Sentry
      const trpcContext = {
        procedure_type: procedureType
      };

      // Optionally attach normalized input to Sentry context
      const shouldAttachInput = options.attachRpcInput !== undefined
        ? options.attachRpcInput
        : GDA([sentryOptions, "optionalAccess", opts => opts.sendDefaultPii]);
      if (shouldAttachInput) {
        trpcContext.input = ZDA.normalize(rawProcedureInput);
      }
      currentTransaction.setContext("trpc", trpcContext);
    }

    /**
     * Captures an error in Sentry if the result is not ok.
     * @param {Object} result - The result object from tRPC resolver.
     */
    function handleErrorResult(result) {
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
      // Call the next middleware or resolver
      result = callNext();
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

    // If result is a Promise (thenable), handle errors asynchronously
    if (ZDA.isThenable(result)) {
      Promise.resolve(result).then(
        resolvedResult => {
          handleErrorResult(resolvedResult);
        },
        validateInteractionEntriesAsync => {
          Fx.captureException(validateInteractionEntriesAsync, {
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
      // Handle synchronous result
      handleErrorResult(result);
    }

    // Return the result (could be a Promise or value)
    return result;
  };
}

module.exports = createTrpcSentryMiddleware;