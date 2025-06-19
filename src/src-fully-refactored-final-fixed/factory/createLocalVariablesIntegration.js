/**
 * Factory function to create the LocalVariables integration for error tracking.
 *
 * This integration captures local variables from stack frames during exceptions or promise rejections,
 * caches them, and injects them into error events for enhanced debugging. It supports rate limiting
 * and is only available on Node.js >= v18.
 *
 * @param {Object} [integrationOptions={}] - Configuration options for the integration.
 * @param {Object} [debuggerApi=T79()] - The debugger API instance used to fetch local variables.
 * @returns {Object} The LocalVariables integration object with setup and event processing methods.
 */
const createLocalVariablesIntegration = (
  integrationOptions = {},
  debuggerApi = T79()
) => {
  // LRU cache for storing up to 20 sets of local variables, keyed by stack hash
  const localVariablesCache = new c91.LRUMap(20);

  /**
   * Rate limiter for controlling how often local variables are captured
   * @type {Function|undefined}
   */
  let rateLimiter;

  /**
   * Flag indicating if the integration is enabled
   * @type {boolean}
   */
  let isEnabled = false;

  /**
   * Handles an exception or promise rejection, capturing local variables from stack frames
   * and caching them for later injection into events.
   *
   * @param {Function} stackParser - Function to parse stack traces.
   * @param {Object} debugEvent - Debug event object containing params.
   * @param {Function} doneCallback - Callback to invoke when done.
   */
  function handleExceptionOrRejection(stackParser, debugEvent, doneCallback) {
    const {
      params: {
        reason: exceptionReason,
        data: exceptionData,
        callFrames
      }
    } = debugEvent;

    // Only process exceptions and promise rejections
    if (exceptionReason !== "exception" && exceptionReason !== "promiseRejection") {
      doneCallback();
      return;
    }

    // Apply rate limiting if configured
    y3([rateLimiter, "optionalCall", fn => fn()]);

    // Generate a hash for the stack to use as a cache key
    const stackHash = l91.hashFromStack(stackParser, y3([exceptionData, "optionalAccess", d => d.description]));
    if (stackHash == null) {
      doneCallback();
      return;
    }

    // Prepare to collect local variables for up to 5 frames
    const { add: addFrameVars, next: nextFrameVars } = createInteractionHandler(collectedVars => {
      localVariablesCache.set(stackHash, collectedVars);
      doneCallback();
    });

    for (let frameIndex = 0; frameIndex < Math.min(callFrames.length, 5); frameIndex++) {
      const {
        scopeChain,
        functionName,
        this: thisContext
      } = callFrames[frameIndex];

      // Find the local scope in the scope chain
      const localScope = scopeChain.find(scope => scope.type === "local");
      // Determine the function name, including class if available
      const functionDisplayName = thisContext.className === "global" || !thisContext.className
        ? functionName
        : `${thisContext.className}.${functionName}`;

      // If local scope or objectId is missing, just record the function name
      if (y3([localScope, "optionalAccess", createInteractionAccessor => createInteractionAccessor.object, "access", createInteractionAccessor => createInteractionAccessor.objectId]) === undefined) {
        addFrameVars(varsArray => {
          varsArray[frameIndex] = { function: functionDisplayName };
          nextFrameVars(varsArray);
        });
      } else {
        // Otherwise, fetch local variables using the debugger API
        const objectId = localScope.object.objectId;
        addFrameVars(varsArray => {
          y3([
            debuggerApi,
            "optionalAccess",
            api => api.getLocalVariables,
            "call",
            api => api(objectId, localVars => {
              varsArray[frameIndex] = {
                function: functionDisplayName,
                vars: localVars
              };
              nextFrameVars(varsArray);
            })
          ]);
        });
      }
    }
    // If no frames, store an empty array
    nextFrameVars([]);
  }

  /**
   * Injects cached local variables into the stack frames of an event, if available.
   *
   * @param {Object} event - The event object to process.
   */
  function injectLocalVariablesIntoEvent(event) {
    // Generate a hash for the stack frames to look up cached variables
    const stackHash = l91.hashFrames(
      y3([event, "optionalAccess", e => e.stacktrace, "optionalAccess", e => e.frames])
    );
    if (stackHash === undefined) return;

    // Remove and retrieve the cached local variables for this stack
    const cachedVars = localVariablesCache.remove(stackHash);
    if (cachedVars === undefined) return;

    // Filter out frames for 'new Promise' (not user code)
    const frames = (
      y3([event, "access", e => e.stacktrace, "optionalAccess", e => e.frames]) || []
    ).filter(frame => frame.function !== "new Promise");

    // Inject local variables into matching frames
    for (let i = 0; i < frames.length; i++) {
      const frameIdx = frames.length - i - 1;
      if (!frames[frameIdx] || !cachedVars[i]) break;
      if (
        cachedVars[i].vars === undefined ||
        frames[frameIdx].in_app === false ||
        !l91.functionNamesMatch(frames[frameIdx].function, cachedVars[i].function)
      ) {
        continue;
      }
      frames[frameIdx].vars = cachedVars[i].vars;
    }
  }

  /**
   * Processes an event, injecting local variables into all exception values if available.
   *
   * @param {Object} event - The event object to process.
   * @returns {Object} The processed event.
   */
  function processEventWithLocalVariables(event) {
    // For each exception value, inject local variables
    for (const exception of y3([
      event,
      "optionalAccess",
      e => e.exception,
      "optionalAccess",
      e => e.values
    ]) || []) {
      injectLocalVariablesIntoEvent(exception);
    }
    return event;
  }

  return {
    name: XZA, // Integration name constant

    /**
     * Sets up the LocalVariables integration, connecting to the debugger and enabling rate limiting.
     */
    setupOnce() {
      const client = aN1.getClient();
      const clientOptions = y3([
        client,
        "optionalAccess",
        c => c.getOptions,
        "call",
        c => c()
      ]);

      // Only enable if debuggerApi is available and the option is set
      if (
        debuggerApi &&
        y3([clientOptions, "optionalAccess", processSubLanguageHighlighting => processSubLanguageHighlighting.includeLocalVariables])
      ) {
        // Only supported on Node >= v18
        if (O79.NODE_VERSION.major < 18) {
          c91.logger.log(
            "The `LocalVariables` integration is only supported on Node >= v18."
          );
          return;
        }
        // Should handleMissingDoctypeError capture all exceptions?
        const captureAll = integrationOptions.captureAllExceptions !== false;
        // Connect the debugger and set up the handler
        debuggerApi.configureAndConnect(
          (debugEvent, doneCallback) =>
            handleExceptionOrRejection(clientOptions.stackParser, debugEvent, doneCallback),
          captureAll
        );
        // If capturing all, set up rate limiting
        if (captureAll) {
          const maxPerSecond = integrationOptions.maxExceptionsPerSecond || 50;
          rateLimiter = l91.createRateLimiter(
            maxPerSecond,
            () => {
              c91.logger.log("Local variables rate-limit lifted.");
              y3([
                debuggerApi,
                "optionalAccess",
                api => api.setPauseOnExceptions,
                "call",
                api => api(true)
              ]);
            },
            seconds => {
              c91.logger.log(
                `Local variables rate-limit exceeded. Disabling capturing of caught exceptions for ${seconds} seconds.`
              );
              y3([
                debuggerApi,
                "optionalAccess",
                api => api.setPauseOnExceptions,
                "call",
                api => api(false)
              ]);
            }
          );
        }
        isEnabled = true;
      }
    },

    /**
     * Processes an event, injecting local variables if the integration is enabled.
     *
     * @param {Object} event - The event to process.
     * @returns {Object} The processed event.
     */
    processEvent(event) {
      if (isEnabled) return processEventWithLocalVariables(event);
      return event;
    },

    /**
     * Returns the number of cached local variable frames.
     * @returns {number}
     */
    _getCachedFramesCount() {
      return localVariablesCache.size;
    },

    /**
     * Returns the first cached frame'createInteractionAccessor local variables, if any.
     * @returns {Object|undefined}
     */
    _getFirstCachedFrame() {
      return localVariablesCache.values()[0];
    }
  };
};

module.exports = createLocalVariablesIntegration;
