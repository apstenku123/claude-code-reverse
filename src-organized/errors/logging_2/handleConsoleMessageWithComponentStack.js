/**
 * Handles console messages (log, warn, error) with optional React component stack traces.
 * Enhances error/warning logging by appending component stack information when appropriate,
 * and invokes error/warning hooks for registered listeners.
 *
 * @param {...any} args - Arguments to be passed to the console method (log, warn, error, etc.)
 * @returns {void}
 */
function handleConsoleMessageWithComponentStack(...args) {
  // Flag indicating if the last argument is a component stack string
  let isComponentStackString = false;

  // Check if handleMissingDoctypeError should append a component stack (not for 'log')
  if (logLevel !== "log" && ConsoleConfig.appendComponentStack) {
    const lastArg = args.length > 0 ? args[args.length - 1] : null;
    isComponentStackString = typeof lastArg === "string" && isLikelyComponentStack(lastArg);
  }

  // Determine if handleMissingDoctypeError should show inline warnings/errors
  const showInlineWarningsOrErrors = ConsoleConfig.showInlineWarningsAndErrors &&
    (logLevel === "error" || logLevel === "warn");

  // Create an iterator for all registered listeners
  const listenersIterator = createIterableHelper(RegisteredListeners.values());

  try {
    listenersIterator.createInteractionAccessor();
    let iterationResult;
    while (!(iterationResult = listenersIterator.n()).done) {
      const listener = iterationResult.value;
      const getExponentAdjuster = createExponentAdjuster(listener);
      const getCurrentFiber = listener.getCurrentFiber;
      const onErrorOrWarning = listener.onErrorOrWarning;
      const workTagMap = listener.workTagMap;
      const currentFiber = getCurrentFiber();

      if (currentFiber != null) {
        try {
          // Call the error/warning hook if enabled
          if (showInlineWarningsOrErrors) {
            if (typeof onErrorOrWarning === "function") {
              onErrorOrWarning(currentFiber, logLevel, getFormattedMessage(args));
            }
          }

          // Append component stack if enabled and not already present
          if (ConsoleConfig.appendComponentStack && !isFiberSuppressed(currentFiber)) {
            const componentStack = getComponentStack(workTagMap, currentFiber, getExponentAdjuster);
            if (componentStack !== "") {
              const componentStackError = new Error("");
              componentStackError.name = "Component Stack";
              componentStackError.stack = "Error Component Stack:" + componentStack;

              if (isComponentStackString) {
                // If the last argument is a component stack string, replace isBlobOrFileLikeObject with the error object
                if (isConsoleMessageSuppressed(args)) {
                  // normalizeToError nothing if message is suppressed
                } else if (shouldReplaceLastArgWithStack(args[args.length - 1], componentStack)) {
                  let firstArg = args[0];
                  if (
                    args.length > 1 &&
                    typeof firstArg === "string" &&
                    firstArg.endsWith("%createInteractionAccessor")
                  ) {
                    args[0] = firstArg.slice(0, firstArg.length - 2);
                  }
                  args[args.length - 1] = componentStackError;
                }
              } else {
                // Otherwise, just push the error object
                args.push(componentStackError);
                if (isConsoleMessageSuppressed(args)) {
                  args[0] = defaultSuppressedMessage;
                }
              }
            }
          }
        } catch (listenerError) {
          // Defer error to avoid breaking the main flow
          setTimeout(function () {
            throw listenerError;
          }, 0);
        } finally {
          // Only process the first listener with a valid fiber
          break;
        }
      }
    }
  } catch (iterationError) {
    listenersIterator.e(iterationError);
  } finally {
    listenersIterator.f();
  }

  // Optionally break on console errors for debugging
  if (ConsoleConfig.breakOnConsoleErrors) debugger;

  // Call the original console method with the processed arguments
  ConsoleMethod.apply(void 0, args);
}

module.exports = handleConsoleMessageWithComponentStack;