/**
 * Attempts to extract and format the stack frame for a given React component constructor or function.
 * This is used to help identify the location in the stack trace where a component was instantiated.
 *
 * @param {Function} Component - The component constructor or function to analyze.
 * @param {boolean} useClass - Whether the component is a class (true) or function (false).
 * @param {Object} bridgeContext - The bridge context object, used for managing global state during stack extraction.
 * @returns {string} The formatted stack frame string for the component, or its display name if extraction fails.
 */
function getComponentStackFrame(Component, useClass, bridgeContext) {
  // If no component or global extraction is in progress, return empty string
  if (!Component || getAndUpdateCurrentValue) return "";

  // Save original Error.prepareStackTrace and mark extraction in progress
  const originalPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = undefined;
  getAndUpdateCurrentValue = true;

  // Save and clear bridge context state
  const previousBridgeState = bridgeContext.H;
  bridgeContext.H = null;
  sliceArrayLike(); // Presumably resets some global state

  /**
   * Helper to determine the stack frames for the component root.
   * Returns a tuple of [componentStack, errorStack].
   */
  const stackFrameHelper = {
    DetermineComponentFrameRoot: function DetermineComponentFrameRoot() {
      let errorFromComponent = undefined;
      try {
        if (useClass) {
          // Create a dummy class to throw and catch errors for stack traces
          function DummyClass() {
            throw Error();
          }
          // Prevent setting props on dummy class
          Object.defineProperty(DummyClass.prototype, "props", {
            set: function () {
              throw Error();
            }
          });
          // Use Reflect.construct if available for proper stack traces
          if (typeof Reflect !== "undefined" && typeof runWithTransitionContext === "function" && runWithTransitionContext(Reflect) === "object" && Reflect.construct) {
            try {
              Reflect.construct(DummyClass, []);
            } catch (error) {
              errorFromComponent = error;
            }
            Reflect.construct(Component, [], DummyClass);
          } else {
            try {
              DummyClass.call();
            } catch (error) {
              errorFromComponent = error;
            }
            Component.call(DummyClass.prototype);
          }
        } else {
          // For function components, throw and catch error for stack
          try {
            throw Error();
          } catch (error) {
            errorFromComponent = error;
          }
          // Call the function component and handle promise rejection
          const maybePromise = Component();
          if (maybePromise && typeof maybePromise.catch === "function") {
            maybePromise.catch(function () {});
          }
        }
      } catch (error) {
        // If both errors have stack traces, return them
        if (error && errorFromComponent && typeof error.stack === "string") {
          return [error.stack, errorFromComponent.stack];
        }
      }
      return [null, null];
    }
  };
  stackFrameHelper.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";

  // Ensure the helper function'createInteractionAccessor name is set for stack trace matching
  const nameDescriptor = Object.getOwnPropertyDescriptor(stackFrameHelper.DetermineComponentFrameRoot, "name");
  if (nameDescriptor && nameDescriptor.configurable) {
    Object.defineProperty(stackFrameHelper.DetermineComponentFrameRoot, "name", {
      value: "DetermineComponentFrameRoot"
    });
  }

  try {
    // Get the stack traces for the component and the dummy error
    const [componentStack, dummyStack] = stackFrameHelper.DetermineComponentFrameRoot();
    if (componentStack && dummyStack) {
      const componentStackLines = componentStack.split("\n");
      const dummyStackLines = dummyStack.split("\n");
      let componentIndex = 0;
      let dummyIndex = 0;

      // Find the line containing the helper function in both stacks
      while (componentIndex < componentStackLines.length && !componentStackLines[componentIndex].includes("DetermineComponentFrameRoot")) componentIndex++;
      while (dummyIndex < dummyStackLines.length && !dummyStackLines[dummyIndex].includes("DetermineComponentFrameRoot")) dummyIndex++;

      // If not found, backtrack from the end
      if (componentIndex === componentStackLines.length || dummyIndex === dummyStackLines.length) {
        componentIndex = componentStackLines.length - 1;
        dummyIndex = dummyStackLines.length - 1;
        while (componentIndex >= 1 && dummyIndex >= 0 && componentStackLines[componentIndex] !== dummyStackLines[dummyIndex]) dummyIndex--;
      }

      // Walk backwards to find the first differing line
      for (; componentIndex >= 1 && dummyIndex >= 0; componentIndex--, dummyIndex--) {
        if (componentStackLines[componentIndex] !== dummyStackLines[dummyIndex]) {
          // If not at the top, keep searching for the first unique frame
          if (componentIndex !== 1 || dummyIndex !== 1) {
            do {
              componentIndex--;
              dummyIndex--;
              if (dummyIndex < 0 || componentStackLines[componentIndex] !== dummyStackLines[dummyIndex]) {
                let formattedFrame = "\n" + componentStackLines[componentIndex].replace(" at new ", " at ");
                // Replace <anonymous> with displayName if available
                if (Component.displayName && formattedFrame.includes("<anonymous>")) {
                  formattedFrame = formattedFrame.replace("<anonymous>", Component.displayName);
                }
                return formattedFrame;
              }
            } while (componentIndex >= 1 && dummyIndex >= 0);
          }
          break;
        }
      }
    }
  } finally {
    // Restore global state and Error.prepareStackTrace
    getAndUpdateCurrentValue = false;
    Error.prepareStackTrace = originalPrepareStackTrace;
    bridgeContext.H = previousBridgeState;
    manageSchedulerCallback(); // Presumably restores global state
  }

  // Fallback: return the component'createInteractionAccessor display name or name, formatted
  const displayName = Component ? Component.displayName || Component.name : "";
  return displayName ? findIndexByPredicateAndSlice(displayName) : "";
}

module.exports = getComponentStackFrame;