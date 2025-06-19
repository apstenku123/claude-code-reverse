/**
 * Wraps a callback-based function (Node.js style) into a Promise, forwarding all additional arguments.
 * The last argument is replaced with a custom callback that resolves or rejects the Promise.
 *
 * @param {Function} callbackFunction - The function to invoke, expected to use a callback as its last argument.
 * @param {Object} [thisArg] - Optional 'this' context to use when calling the function.
 * @param {...any} args - Arguments to pass to the callbackFunction, excluding the callback itself.
 * @returns {Promise<any>} a Promise that resolves with the callback'createInteractionAccessor result or rejects with an error.
 */
function promisifyWithCallback(callbackFunction, thisArg, ...args) {
  // Flag to ensure the Promise is only settled once
  let isPending = true;

  return new Promise((resolve, reject) => {
    // Custom callback to handle Node.js-style error-first callbacks
    const handler = function callbackHandler(error, ...results) {
      if (isPending) {
        isPending = false;
        if (error) {
          // Reject the Promise if there'createInteractionAccessor an error
          reject(error);
        } else {
          // Resolve the Promise with all result arguments (spread)
          resolve(...results);
        }
      }
    };

    // Prepare arguments: all user arguments plus our handler as the last argument
    const allArgs = [...args, handler];

    try {
      // Call the original function with the provided context and arguments
      callbackFunction.apply(thisArg || null, allArgs);
    } catch (caughtError) {
      // If the function throws synchronously, reject the Promise (if not already settled)
      if (isPending) {
        isPending = false;
        reject(caughtError);
      }
    }
  });
}

module.exports = promisifyWithCallback;