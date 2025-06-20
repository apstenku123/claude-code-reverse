/**
 * Factory function to create the Promise Rejection integration for error tracking.
 *
 * This integration captures local variables from stack frames when exceptions or promise rejections occur,
 * caches them, and injects them into error events for enhanced debugging. It also manages rate limiting
 * and compatibility with Node.js versions.
 *
 * @param {Object} [integrationOptions={}] - Optional configuration for the integration (e.g., maxExceptionsPerSecond, captureAllExceptions).
 * @param {Object} debugAdapter - Debug adapter instance providing methods for local variable extraction and configuration.
 * @returns {Object} Integration object with setupOnce, processEvent, and cache inspection methods.
 */
function createPromiseRejectionIntegration(integrationOptions = {}, debugAdapter = T79()) {
  // LRU cache for storing local variables from stack frames
  const localVariablesCache = new c91.LRUMap(20);
  let rateLimiter;
  let isEnabled = false;

  /**
   * Handles an exception or promise rejection by extracting local variables from stack frames.
   *
   * @param {Function} stackParser - Function to parse stack traces.
   * @param {Object} event - Exception event containing params (reason, data, callFrames).
   * @param {Function} doneCallback - Callback to invoke when processing is complete.
   */
  function handleExceptionOrRejection(stackParser, { params: { reason, data, callFrames } }, doneCallback) {
    // Only process exceptions and promise rejections
    if (reason !== "exception" && reason !== "promiseRejection") {
      doneCallback();
      return;
    }

    // Apply rate limiting if configured
    y3([rateLimiter, "optionalCall", limiter => limiter()]);

    // Generate a hash key from the stack and exception data
    const stackHash = l91.hashFromStack(stackParser, y3([data, "optionalAccess", d => d.description]));
    if (stackHash == null) {
      doneCallback();
      return;
    }

    // Prepare to collect local variables for up to 5 stack frames
    const { add: addFrameVars, next: nextFrameVars } = createInteractionHandler(collectedVars => {
      localVariablesCache.set(stackHash, collectedVars);
      doneCallback();
    });

    for (let frameIndex = 0; frameIndex < Math.min(callFrames.length, 5); frameIndex++) {
      const { scopeChain, functionName, this: thisContext } = callFrames[frameIndex];
      const localScope = scopeChain.find(scope => scope.type === "local");
      // Determine function display name, including class if available
      const functionDisplayName = thisContext.className === "global" || !thisContext.className
        ? functionName
        : `${thisContext.className}.${functionName}`;

      // If no local scope objectId, just record the function name
      if (y3([localScope, "optionalAccess", createInteractionAccessor => createInteractionAccessor.object, "access", createInteractionAccessor => createInteractionAccessor.objectId]) === undefined) {
        addFrameVars(varsArray => {
          varsArray[frameIndex] = { function: functionDisplayName };
          nextFrameVars(varsArray);
        });
      } else {
        // Otherwise, fetch local variables from the debug adapter
        const localObjectId = localScope.object.objectId;
        addFrameVars(varsArray => {
          y3([
            debugAdapter,
            "optionalAccess",
            adapter => adapter.getLocalVariables,
            "call",
            getVars => getVars(localObjectId, vars => {
              varsArray[frameIndex] = {
                function: functionDisplayName,
                vars
              };
              nextFrameVars(varsArray);
            })
          ]);
        });
      }
    }
    // If no frames, ensure callback is called
    nextFrameVars([]);
  }

  /**
   * Injects cached local variables into stack frames of an error event.
   *
   * @param {Object} event - The error event to process.
   */
  function injectLocalVariablesIntoFrames(event) {
    // Compute a hash for the stack frames
    const stackHash = l91.hashFrames(y3([event, "optionalAccess", e => e.stacktrace, "optionalAccess", e => e.frames]));
    if (stackHash === undefined) return;
    const cachedVars = localVariablesCache.remove(stackHash);
    if (cachedVars === undefined) return;

    // Filter out frames for 'new Promise' constructors
    const frames = (y3([event, "access", e => e.stacktrace, "optionalAccess", e => e.frames]) || [])
      .filter(frame => frame.function !== "new Promise");

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
   * Processes an error event, injecting local variables into all exception values.
   *
   * @param {Object} event - The error event to process.
   * @returns {Object} The processed event with local variables injected.
   */
  function processEventWithLocalVariables(event) {
    // For each exception value, inject local variables
    for (const exceptionValue of y3([event, "optionalAccess", e => e.exception, "optionalAccess", e => e.values]) || []) {
      injectLocalVariablesIntoFrames(exceptionValue);
    }
    return event;
  }

  return {
    name: XZA,
    /**
     * Sets up the integration, configuring the debug adapter and rate limiter as needed.
     */
    setupOnce() {
      const client = aN1.getClient();
      const clientOptions = y3([client, "optionalAccess", c => c.getOptions, "call", c => c()]);
      if (debugAdapter && y3([clientOptions, "optionalAccess", processSubLanguageHighlighting => processSubLanguageHighlighting.includeLocalVariables])) {
        // Only supported on Node >= 18
        if (O79.NODE_VERSION.major < 18) {
          c91.logger.log("The `LocalVariables` integration is only supported on Node >= v18.");
          return;
        }
        const captureAll = integrationOptions.captureAllExceptions !== false;
        debugAdapter.configureAndConnect(
          (event, done) => handleExceptionOrRejection(clientOptions.stackParser, event, done),
          captureAll
        );
        if (captureAll) {
          const maxPerSecond = integrationOptions.maxExceptionsPerSecond || 50;
          rateLimiter = l91.createRateLimiter(
            maxPerSecond,
            () => {
              c91.logger.log("Local variables rate-limit lifted.");
              y3([debugAdapter, "optionalAccess", d => d.setPauseOnExceptions, "call", d => d(true)]);
            },
            seconds => {
              c91.logger.log(`Local variables rate-limit exceeded. Disabling capturing of caught exceptions for ${seconds} seconds.`);
              y3([debugAdapter, "optionalAccess", d => d.setPauseOnExceptions, "call", d => d(false)]);
            }
          );
        }
        isEnabled = true;
      }
    },
    /**
     * Processes an event, injecting local variables if enabled.
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
     *
     * @returns {number} The cache size.
     */
    _getCachedFramesCount() {
      return localVariablesCache.size;
    },
    /**
     * Returns the first cached frame'createInteractionAccessor local variables.
     *
     * @returns {Object|undefined} The first cached frame'createInteractionAccessor variables, if any.
     */
    _getFirstCachedFrame() {
      return localVariablesCache.values()[0];
    }
  };
}

module.exports = createPromiseRejectionIntegration;