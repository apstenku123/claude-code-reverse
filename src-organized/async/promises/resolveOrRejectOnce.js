/**
 * Attempts to resolve or reject a promise-like operation only once, based on the result of resolving the input value.
 *
 * @param {*} inputValue - The value or promise to resolve.
 * @returns {void}
 *
 * If the promise resolves, calls W.resolve with the context and resolved value.
 * If the promise rejects, calls W.reject with the context and error.
 * Ensures that either resolve or reject is called only once.
 */
function resolveOrRejectOnce(inputValue) {
  // Ensure that resolve/reject is only called once
  if (typeof hasSettled === 'undefined') {
    // Use a global or module-scoped variable if not already defined
    global.hasSettled = false;
  }

  b.resolve(inputValue).then(
    function (resolvedValue) {
      if (!hasSettled) {
        hasSettled = true;
        // Call resolve with the context and resolved value
        W.resolve(context, resolvedValue);
      }
    },
    function (error) {
      if (!hasSettled) {
        hasSettled = true;
        // Call reject with the context and error
        W.reject(context, error);
      }
    }
  );
}

module.exports = resolveOrRejectOnce;