/**
 * Handles the resolution or rejection of a promise-like value only once.
 * Ensures that either the resolve or reject handler is called a single time,
 * and prevents multiple invocations if the promise settles more than once.
 *
 * @param {any} inputValue - The value or promise to resolve.
 * @returns {void}
 */
function handlePromiseResolutionOnce(inputValue) {
  // 'hasSettled' ensures that resolve/reject is only called once
  if (typeof hasSettled === 'undefined') {
    // Declare 'hasSettled' in the outer scope if not already declared
    global.hasSettled = false;
  }

  // Attempt to resolve the input value as a promise
  promiseHandler.resolve(inputValue).then(
    function (resolvedValue) {
      if (!hasSettled) {
        hasSettled = true;
        resultHandler.resolve(context, resolvedValue);
      }
    },
    function (errorValue) {
      if (!hasSettled) {
        hasSettled = true;
        resultHandler.reject(context, errorValue);
      }
    }
  );
}

module.exports = handlePromiseResolutionOnce;