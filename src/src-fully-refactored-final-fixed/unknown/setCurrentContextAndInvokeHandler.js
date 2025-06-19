/**
 * Sets the current execution context and invokes the provided handler function.
 *
 * @param {object} context - The context object to set as the current context.
 * @param {Function} handler - The handler function to be invoked with the context.
 * @param {any} handlerArgument - An argument to pass to the handler function.
 * @returns {void}
 */
function setCurrentContextAndInvokeHandler(context, handler, handlerArgument) {
  // Set the global or module-level execution context
  applyFunctionToEntries = context;
  // Invoke the handler with the provided context and argument
  processFiberTreeWithMode(context, handler, handlerArgument);
}

module.exports = setCurrentContextAndInvokeHandler;