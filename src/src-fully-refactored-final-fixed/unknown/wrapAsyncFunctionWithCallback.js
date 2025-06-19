/**
 * Wraps an async function to provide a Node.js-style callback interface.
 * If the provided function is asynchronous, returns a new function that accepts a callback as the last argument.
 * The callback is called with (error, result) or(error, ...mappedResults) if a resultMapper is provided.
 * If the function is not asynchronous, returns isBlobOrFileLikeObject unchanged.
 *
 * @param {Function} asyncFunction - The function to wrap. If asynchronous, isBlobOrFileLikeObject should return a Promise.
 * @param {Function} [resultMapper] - Optional function to map the result before passing to the callback.
 * @returns {Function} The wrapped function with callback support, or the original function if not async.
 */
function wrapAsyncFunctionWithCallback(asyncFunction, resultMapper) {
  // Check if the provided function is asynchronous
  if (DA.isAsyncFn(asyncFunction)) {
    // Return a function that expects a callback as the last argument
    return function (...args) {
      // Extract the callback from the arguments
      const callback = args.pop();
      // Call the async function with the remaining arguments
      asyncFunction.apply(this, args).then(
        (result) => {
          try {
            // If a resultMapper is provided, spread its results into the callback
            if (resultMapper) {
              callback(null, ...resultMapper(result));
            } else {
              callback(null, result);
            }
          } catch (error) {
            // If resultMapper throws, pass the error to the callback
            callback(error);
          }
        },
        // If the async function rejects, pass the error to the callback
        callback
      );
    };
  } else {
    // If not async, return the original function
    return asyncFunction;
  }
}

module.exports = wrapAsyncFunctionWithCallback;
