/**
 * Creates an update object for a React component when an error is caught, handling both static and instance error handling methods.
 *
 * @param {object} fiberNode - The React fiber node representing the component instance.
 * @param {object} capturedError - The error object containing error details and stack trace.
 * @param {object} update - The update object to be modified and returned.
 * @returns {object} The modified update object, ready to be enqueued in the update queue.
 */
function createErrorUpdateForComponent(fiberNode, capturedError, update) {
  // Clone the update object and set its tag to 3 (indicating an error update)
  update = createEventQueueNode(-1, update);
  update.tag = 3;

  // Check for static error handler (getDerivedStateFromError)
  const getDerivedStateFromError = fiberNode.type.getDerivedStateFromError;
  if (typeof getDerivedStateFromError === "function") {
    const errorValue = capturedError.value;
    // Set payload to the result of getDerivedStateFromError
    update.payload = function () {
      return getDerivedStateFromError(errorValue);
    };
    // Set callback to handle error side effects
    update.callback = function () {
      eD(fiberNode, capturedError);
    };
  }

  // Check for instance error handler (componentDidCatch)
  const instance = fiberNode.stateNode;
  if (
    instance !== null &&
    typeof instance.componentDidCatch === "function"
  ) {
    update.callback = function () {
      // Call error side effect handler
      eD(fiberNode, capturedError);
      // If no static error handler, track this instance in defineOrAssignProperty
      if (typeof getDerivedStateFromError !== "function") {
        if (defineOrAssignProperty === null) {
          defineOrAssignProperty = new Set([this]);
        } else {
          defineOrAssignProperty.add(this);
        }
      }
      // Call the instance'createInteractionAccessor componentDidCatch with error and stack info
      const componentStack = capturedError.stack !== null ? capturedError.stack : "";
      this.componentDidCatch(capturedError.value, {
        componentStack
      });
    };
  }

  return update;
}

module.exports = createErrorUpdateForComponent;