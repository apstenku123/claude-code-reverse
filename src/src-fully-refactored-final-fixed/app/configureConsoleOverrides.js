/**
 * Configures console method overrides for React DevTools features such as
 * appending component stacks, breaking on errors, and showing inline warnings/errors.
 *
 * @param {Object} options - Configuration options for console overrides.
 * @param {boolean} options.appendComponentStack - Whether to append component stack traces to logs.
 * @param {boolean} options.breakOnConsoleErrors - Whether to break on console errors (debugger).
 * @param {boolean} options.showInlineWarningsAndErrors - Whether to show inline warnings and errors.
 * @param {boolean} options.hideConsoleLogsInStrictMode - Whether to hide logs in strict mode.
 * @param {string} options.browserTheme - The current browser theme (for UI purposes).
 * @returns {void}
 *
 * This function overrides console methods (log, warn, error, etc.) to inject React DevTools
 * specific behaviors. It is idempotent and will only apply overrides once until reset.
 */
function configureConsoleOverrides(options) {
  const {
    appendComponentStack,
    breakOnConsoleErrors,
    showInlineWarningsAndErrors,
    hideConsoleLogsInStrictMode,
    browserTheme
  } = options;

  // Update global DevTools config
  NJ.appendComponentStack = appendComponentStack;
  NJ.breakOnConsoleErrors = breakOnConsoleErrors;
  NJ.showInlineWarningsAndErrors = showInlineWarningsAndErrors;
  NJ.hideConsoleLogsInStrictMode = hideConsoleLogsInStrictMode;
  NJ.browserTheme = browserTheme;

  // Only override if at least one relevant feature is enabled
  if (appendComponentStack || breakOnConsoleErrors || showInlineWarningsAndErrors) {
    // Prevent double-patching
    if (createCustomError !== null) return;

    const originalConsoleMethods = {};
    // Store a restore function globally
    createCustomError = function restoreConsoleMethods() {
      for (const methodName in originalConsoleMethods) {
        try {
          WY[methodName] = originalConsoleMethods[methodName];
        } catch (restoreError) {
          // Ignore errors during restore
        }
      }
    };

    // Patch each console method in getPlaceholderProperty(e.g., ['log', 'warn', 'error', ...])
    getPlaceholderProperty.forEach(function (methodName) {
      try {
        // Save the original method (or its original if already patched)
        const originalMethod = originalConsoleMethods[methodName] =
          WY[methodName].__REACT_DEVTOOLS_ORIGINAL_METHOD__
            ? WY[methodName].__REACT_DEVTOOLS_ORIGINAL_METHOD__
            : WY[methodName];

        /**
         * Overridden console method with DevTools logic
         * @param  {...any} args
         */
        function devtoolsConsoleOverride(...args) {
          let isComponentStack = false;

          // If not 'log' and stack appending is enabled, check if last arg is a stack
          if (methodName !== "log" && NJ.appendComponentStack) {
            const maybeStack = args.length > 0 ? args[args.length - 1] : null;
            isComponentStack = typeof maybeStack === "string" && Z6(maybeStack);
          }

          const isInlineWarningOrError =
            NJ.showInlineWarningsAndErrors && (methodName === "error" || methodName === "warn");

          // Iterate through all registered DevTools roots
          const rootsIterator = createIterableHelper(calculateSliceRange.values());
          let nextRoot;
          try {
            for (rootsIterator.createInteractionAccessor(); !(nextRoot = rootsIterator.n()).done;) {
              const devtoolsRoot = nextRoot.value;
              const fiberAdjuster = createExponentAdjuster(devtoolsRoot);
              const getCurrentFiber = devtoolsRoot.getCurrentFiber;
              const onErrorOrWarning = devtoolsRoot.onErrorOrWarning;
              const workTagMap = devtoolsRoot.workTagMap;
              const currentFiber = getCurrentFiber();

              if (currentFiber != null) {
                try {
                  // Call error/warning handler if enabled
                  if (isInlineWarningOrError && typeof onErrorOrWarning === "function") {
                    onErrorOrWarning(currentFiber, methodName, II(args));
                  }

                  // Append component stack if enabled and fiber is not hidden
                  if (NJ.appendComponentStack && !gk(currentFiber)) {
                    const componentStack = runWithTransitionSuppressed(workTagMap, currentFiber, fiberAdjuster);
                    if (componentStack !== "") {
                      const stackError = new Error("");
                      stackError.name = "Component Stack";
                      stackError.stack = "Error Component Stack:" + componentStack;

                      if (isComponentStack) {
                        // If the last argument is a stack, replace isBlobOrFileLikeObject with the error object
                        if (D6(args)) {
                          // normalizeToError nothing if args are already in the correct format
                        } else if (pk(args[args.length - 1], componentStack)) {
                          let firstArg = args[0];
                          // Remove trailing '%createInteractionAccessor' if present
                          if (args.length > 1 && typeof firstArg === "string" && firstArg.endsWith("%createInteractionAccessor")) {
                            args[0] = firstArg.slice(0, firstArg.length - 2);
                          }
                          args[args.length - 1] = stackError;
                        }
                      } else {
                        // Otherwise, just append the error object
                        args.push(stackError);
                        if (D6(args)) args[0] = zA;
                      }
                    }
                  }
                } catch (fiberError) {
                  // Defer error to avoid breaking the console
                  setTimeout(function () {
                    throw fiberError;
                  }, 0);
                } finally {
                  // Only process the first matching root
                  break;
                }
              }
            }
          } catch (rootIterError) {
            rootsIterator.e(rootIterError);
          } finally {
            rootsIterator.f();
          }

          // Optionally break on errors
          if (NJ.breakOnConsoleErrors) debugger;

          // Call the original console method
          originalMethod.apply(void 0, args);
        }

        // Attach references for restoration
        devtoolsConsoleOverride.__REACT_DEVTOOLS_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_OVERRIDE_METHOD__ = devtoolsConsoleOverride;
        WY[methodName] = devtoolsConsoleOverride;
      } catch (patchError) {
        // Ignore errors patching this method
      }
    });
  } else {
    // If no features enabled, restore original console methods
    resetCustomErrorHandler();
  }
}

module.exports = configureConsoleOverrides;