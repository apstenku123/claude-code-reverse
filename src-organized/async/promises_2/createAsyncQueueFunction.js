/**
 * Creates a queued async function wrapper that ensures only one invocation of the provided async function runs at a time.
 * Additional calls are queued and executed sequentially in order of arrival.
 *
 * @param {Function} asyncFunction - The async function to be wrapped and queued. It will be called with the same context and arguments as the wrapper.
 * @returns {Function} a function that returns a Promise, queues calls, and resolves/rejects in order.
 */
function createAsyncQueueFunction(asyncFunction) {
  /**
   * Queue of pending function calls. Each item contains:
   * - args: Arguments to pass to asyncFunction
   * - resolve: Promise resolve function
   * - reject: Promise reject function
   * - context: 'this' context to use when calling asyncFunction
   */
  const callQueue = [];
  // Indicates whether the queue is currently being processed
  let isProcessing = false;

  /**
   * Processes the call queue sequentially, ensuring only one asyncFunction runs at a time.
   */
  async function processQueue() {
    // If already processing or queue is empty, do nothing
    if (isProcessing) return;
    if (callQueue.length === 0) return;
    isProcessing = true;
    while (callQueue.length > 0) {
      // Dequeue the next call
      const { args, resolve, reject, context } = callQueue.shift();
      try {
        // Call asyncFunction with correct context and arguments
        const result = await asyncFunction.apply(context, args);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }
    // Finished processing current batch; check if new calls arrived during processing
    isProcessing = false;
    if (callQueue.length > 0) processQueue();
  }

  /**
   * The wrapper function that queues calls and returns a Promise.
   * @param  {...any} args - Arguments to pass to asyncFunction
   * @returns {Promise<any>} Promise resolving/rejecting with asyncFunction'createInteractionAccessor result
   */
  return function queuedAsyncFunction(...args) {
    return new Promise((resolve, reject) => {
      callQueue.push({
        args,
        resolve,
        reject,
        context: this
      });
      processQueue();
    });
  };
}

module.exports = createAsyncQueueFunction;