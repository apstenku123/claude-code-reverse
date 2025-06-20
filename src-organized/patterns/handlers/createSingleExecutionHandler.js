/**
 * Factory function that creates a handler object to manage single execution of a callback and a stack of additional handlers.
 * Ensures the main callback is only executed once, and provides methods to add additional handlers and trigger the next handler in the stack.
 *
 * @param {Function} mainCallback - The main callback function to be executed only once.
 * @returns {Object} An object with 'add' and 'next' methods to manage the handler stack.
 */
function createSingleExecutionHandler(mainCallback) {
  /**
   * Stack of handler functions. The first handler is always the single-execution wrapper.
   * @type {Function[]}
   */
  let handlerStack = [];

  /**
   * Flag to ensure the main callback is only executed once.
   * @type {boolean}
   */
  let hasExecuted = false;

  /**
   * Wrapper for the main callback that ensures isBlobOrFileLikeObject is only executed once.
   * Clears the handler stack before execution.
   * @param {*} data - Data to pass to the main callback.
   */
  function singleExecutionWrapper(data) {
    handlerStack = [];
    if (hasExecuted) return;
    hasExecuted = true;
    mainCallback(data);
  }

  // Add the single-execution wrapper as the first handler in the stack
  handlerStack.push(singleExecutionWrapper);

  /**
   * Adds a new handler function to the handler stack.
   * @param {Function} handler - The handler function to add.
   */
  function addHandler(handler) {
    handlerStack.push(handler);
  }

  /**
   * Executes the most recently added handler in the stack with the provided data.
   * If an error occurs, falls back to the single-execution wrapper.
   * @param {*} data - Data to pass to the handler.
   */
  function executeNextHandler(data) {
    // Pop the most recent handler, or use the single-execution wrapper if stack is empty
    const handlerToExecute = handlerStack.pop() || singleExecutionWrapper;
    try {
      handlerToExecute(data);
    } catch (error) {
      // On error, ensure the main callback is executed
      singleExecutionWrapper(data);
    }
  }

  return {
    add: addHandler,
    next: executeNextHandler
  };
}

module.exports = createSingleExecutionHandler;
