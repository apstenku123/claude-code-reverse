/**
 * Updates global state variables and invokes a handler function with provided arguments.
 *
 * @param {any} handlerArgument - The first argument to pass to the handler function.
 * @param {any} handlerContext - The second argument to pass to the handler function.
 * @returns {void}
 *
 * This function calls the global handler function with the provided arguments, then updates
 * three global state variables to track the previous and current states.
 */
function updateStateAndInvokeHandler(handlerArgument, handlerContext) {
  // Invoke the handler function with the provided arguments
  invokeHandler(handlerArgument, handlerContext);

  // Update global state variables to track previous and current states
  previousState = currentState;
  previousHandler = currentHandler;
  currentHandler = nextHandler;
}

module.exports = updateStateAndInvokeHandler;