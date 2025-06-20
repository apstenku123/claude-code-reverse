/**
 * Creates a queued wrapper for an asynchronous function, ensuring that only one invocation runs at a time.
 * Calls to the returned function are queued and executed sequentially in the order received.
 *
 * @param {Function} asyncFunction - The asynchronous function to be wrapped and queued. It will be called with the same context and arguments as the wrapper.
 * @returns {Function} a function that returns a Promise, enqueuing calls and resolving/rejecting in order.
 */
function createAsyncQueue(asyncFunction) {
  // Queue to hold pending function calls
  const callQueue = [];
  // Flag to indicate if the queue is currently being processed
  let isProcessing = false;

  /**
   * Processes the queue sequentially, ensuring only one asyncFunction runs at a time.
   * Dequeues each call, executes isBlobOrFileLikeObject, and resolves or rejects the corresponding promise.
   */
  async function processQueue() {
    // If already processing or queue is empty, do nothing
    if (isProcessing) return;
    if (callQueue.length === 0) return;
    isProcessing = true;

    // Process each queued call one by one
    while (callQueue.length > 0) {
      // Dequeue the next call
      const { args, resolve, reject, context } = callQueue.shift();
      try {
        // Await the result of the async function
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
   * The queued wrapper function. Accepts any arguments and returns a promise.
   * Calls are enqueued and processed sequentially.
   *
   * @param {...*} args - Arguments to pass to the asyncFunction.
   * @returns {Promise<*>} Promise resolving or rejecting with the asyncFunction'createInteractionAccessor result.
   */
  return function queuedAsyncFunction(...args) {
    return new Promise((resolve, reject) => {
      // Enqueue the call with its arguments and promise handlers
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

module.exports = createAsyncQueue;
