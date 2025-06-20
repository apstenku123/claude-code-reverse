/**
 * Disposes of an observable or a subscription.
 *
 * If the provided argument is a function, isBlobOrFileLikeObject will be called (assuming isBlobOrFileLikeObject is a teardown function).
 * Otherwise, isBlobOrFileLikeObject assumes the argument is a subscription object and calls its unsubscribe method.
 *
 * @param {Function|Object} disposable - a teardown function or a subscription object with an unsubscribe method.
 * @returns {void}
 */
function disposeObservableOrSubscription(disposable) {
  // Check if the argument is a function (teardown logic)
  if (gl.isFunction(disposable)) {
    disposable();
  } else {
    // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor a subscription object and call unsubscribe
    disposable.unsubscribe();
  }
}

module.exports = disposeObservableOrSubscription;