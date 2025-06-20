/**
 * Creates a function that queues asynchronous calls and ensures they are executed sequentially.
 * Each call to the returned function is queued and executed only after the previous one completes.
 * Useful for serializing access to a resource or function that should not run concurrently.
 *
 * @param {Function} asyncFunction - The asynchronous function to be executed sequentially. It will be called with the same context and arguments as provided to the wrapper function.
 * @returns {Function} a function that, when called, returns a Promise that resolves or rejects with the result of the asyncFunction, ensuring sequential execution.
 */
function createSequentialAsyncQueue(asyncFunction) {
  /**
   * Queue of pending function calls. Each item is an object containing:
   * - args: Arguments to pass to asyncFunction
   * - resolve: Promise resolve function
   * - reject: Promise reject function
   * - context: 'this' context to apply
   */
  const callQueue = [];
  // Indicates whether the queue is currently being processed
  let isProcessing = false;

  /**
   * Processes the call queue sequentially. Each queued call is executed only after the previous one completes.
   * This function is called automatically when a new call is added to the queue.
   */
  async function processQueue() {
    // If already processing, exit to prevent concurrent execution
    if (isProcessing) return;
    // If the queue is empty, nothing to process
    if (callQueue.length === 0) return;
    isProcessing = true;
    while (callQueue.length > 0) {
      // Dequeue the next call
      const { args, resolve, reject, context } = callQueue.shift();
      try {
        // Execute the async function with the correct context and arguments
        const result = await asyncFunction.apply(context, args);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }
    // Mark processing as done
    isProcessing = false;
    // If new calls were added during processing, process them
    if (callQueue.length > 0) processQueue();
  }

  /**
   * The wrapper function that queues calls and returns a Promise.
   * @param {...*} args - Arguments to pass to asyncFunction
   * @returns {Promise<*>} Promise that resolves or rejects with the result of asyncFunction
   */
  return function queuedAsyncFunction(...args) {
    return new Promise((resolve, reject) => {
      // Add the call to the queue with its arguments and promise handlers
      callQueue.push({
        args,
        resolve,
        reject,
        context: this
      });
      // Start processing the queue
      processQueue();
    });
  };
}

module.exports = createSequentialAsyncQueue;