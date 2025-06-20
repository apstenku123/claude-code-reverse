/**
 * Wraps a callback-based observable function into a Promise-based function.
 *
 * This utility converts a function that expects a callback as its last argument (with the Node.js error-first signature)
 * into a function that returns a Promise. The Promise resolves if the callback is called with no error, and rejects if an error is passed.
 *
 * @param {Function} observableFunction - The original function that expects a callback as its last argument.
 * @returns {Function} a function that returns a Promise, forwarding all arguments to the original function except for the callback.
 */
function promisifyObservableWithCallback(observableFunction) {
  return (...observableArgs) => {
    return new Promise((resolve, reject) => {
      // Append a callback to handle Node.js-style error-first signature
      observableArgs.push((error, result) => {
        if (error) {
          // Reject the Promise if an error is provided
          reject(error);
        } else {
          // Resolve the Promise with the result
          resolve(result);
        }
      });
      // Call the original function with all arguments and the callback
      observableFunction(...observableArgs);
    });
  };
}

module.exports = promisifyObservableWithCallback;