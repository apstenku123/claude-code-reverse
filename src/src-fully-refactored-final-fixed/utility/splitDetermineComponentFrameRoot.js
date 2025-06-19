/**
 * Attempts to extract and format the stack frame for a given component constructor or function.
 * This is useful for debugging and error reporting, especially to identify the root frame of a component.
 *
 * @param {Function} ComponentConstructor - The component constructor or function to analyze.
 * @param {boolean} useReflect - Whether to use Reflect.construct for instantiation (typically true for classes).
 * @param {Object} bridgeContext - Context object, expected to have a property 'H' used for bridge state management.
 * @returns {string} The formatted stack frame string for the component, or an empty string if not found.
 */
function splitDetermineComponentFrameRoot(ComponentConstructor, useReflect, bridgeContext) {
  // If the component is not provided or global flag getAndUpdateCurrentValue is set, return empty string
  if (!ComponentConstructor || getAndUpdateCurrentValue) return "";

  // Save the original Error.prepareStackTrace to restore later
  const originalPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = undefined;
  getAndUpdateCurrentValue = true;

  // Save and clear the bridge context'createInteractionAccessor H property
  const previousBridgeH = bridgeContext.H;
  bridgeContext.H = null;
  sliceArrayLike(); // Presumably resets some global state

  /**
   * Helper function to determine the stack frames for the component root.
   * Returns a tuple of [componentStack, errorStack].
   */
  const stackFrameHelper = {
    DetermineComponentFrameRoot: function getComponentStackFrames() {
      let errorFromConstructor = undefined;
      try {
        if (useReflect) {
          // For class components, create a dummy constructor that throws
          const DummyConstructor = function DummyConstructor() {
            throw Error();
          };
          // Prevent setting 'props' on the dummy prototype
          Object.defineProperty(DummyConstructor.prototype, "props", {
            set: function () {
              throw Error();
            }
          });
          // Use Reflect.construct if available
          if ((typeof Reflect === "undefined" ? "undefined" : runWithTransitionContext(Reflect)) === "object" && Reflect.construct) {
            try {
              Reflect.construct(DummyConstructor, []);
            } catch (error) {
              errorFromConstructor = error;
            }
            Reflect.construct(ComponentConstructor, [], DummyConstructor);
          } else {
            // Fallback for environments without Reflect.construct
            try {
              DummyConstructor.call();
            } catch (error) {
              errorFromConstructor = error;
            }
            ComponentConstructor.call(DummyConstructor.prototype);
          }
        } else {
          // For function components, throw and catch an error
          try {
            throw Error();
          } catch (error) {
            errorFromConstructor = error;
          }
          // Call the function component and handle if isBlobOrFileLikeObject returns a Promise
          const maybePromise = ComponentConstructor();
          if (maybePromise && typeof maybePromise.catch === "function") {
            maybePromise.catch(function () {});
          }
        }
      } catch (error) {
        // If both errors are present and have stack traces, return them
        if (error && errorFromConstructor && typeof error.stack === "string") {
          return [error.stack, errorFromConstructor.stack];
        }
      }
      return [null, null];
    }
  };
  stackFrameHelper.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";

  // Ensure the helper function'createInteractionAccessor name is set for stack trace clarity
  const helperNameDescriptor = Object.getOwnPropertyDescriptor(stackFrameHelper.DetermineComponentFrameRoot, "name");
  if (helperNameDescriptor && helperNameDescriptor.configurable) {
    Object.defineProperty(stackFrameHelper.DetermineComponentFrameRoot, "name", {
      value: "DetermineComponentFrameRoot"
    });
  }

  try {
    // Get the stack traces from the helper
    const [componentStack, errorStack] = stackFrameHelper.DetermineComponentFrameRoot();
    if (componentStack && errorStack) {
      // Split stack traces into lines
      const componentStackLines = componentStack.split(`\n`);
      const errorStackLines = errorStack.split(`\n`);
      let componentIndex = 0;
      let errorIndex = 0;

      // Find the line containing the helper function in both stacks
      while (componentIndex < componentStackLines.length && !componentStackLines[componentIndex].includes("DetermineComponentFrameRoot")) componentIndex++;
      while (errorIndex < errorStackLines.length && !errorStackLines[errorIndex].includes("DetermineComponentFrameRoot")) errorIndex++;

      // If not found, backtrack from the end
      if (componentIndex === componentStackLines.length || errorIndex === errorStackLines.length) {
        componentIndex = componentStackLines.length - 1;
        errorIndex = errorStackLines.length - 1;
        while (componentIndex >= 1 && errorIndex >= 0 && componentStackLines[componentIndex] !== errorStackLines[errorIndex]) errorIndex--;
      }

      // Walk backwards to find the first differing line
      for (; componentIndex >= 1 && errorIndex >= 0; componentIndex--, errorIndex--) {
        if (componentStackLines[componentIndex] !== errorStackLines[errorIndex]) {
          // If not at the top, keep walking back until a difference is found
          if (componentIndex !== 1 || errorIndex !== 1) {
            do {
              componentIndex--;
              errorIndex--;
              if (errorIndex < 0 || componentStackLines[componentIndex] !== errorStackLines[errorIndex]) {
                let formattedFrame = `\n` + componentStackLines[componentIndex].replace(" at new ", " at ");
                // Replace <anonymous> with displayName if available
                if (ComponentConstructor.displayName && formattedFrame.includes("<anonymous>")) {
                  formattedFrame = formattedFrame.replace("<anonymous>", ComponentConstructor.displayName);
                }
                return formattedFrame;
              }
            } while (componentIndex >= 1 && errorIndex >= 0);
          }
          break;
        }
      }
    }
  } finally {
    // Restore global and context state
    getAndUpdateCurrentValue = false;
    Error.prepareStackTrace = originalPrepareStackTrace;
    bridgeContext.H = previousBridgeH;
    manageSchedulerCallback(); // Presumably restores some global state
  }

  // Fallback: return the display name or name of the component, formatted
  const componentName = ComponentConstructor ? ComponentConstructor.displayName || ComponentConstructor.name : "";
  const formattedName = componentName ? findIndexByPredicateAndSlice(componentName) : "";
  return formattedName;
}

module.exports = splitDetermineComponentFrameRoot;