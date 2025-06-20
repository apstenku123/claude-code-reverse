/**
 * Invokes a function if the provided argument is a function, otherwise unsubscribes from an observable.
 *
 * @param {Function|Object} observableOrFunction - Either a function to invoke or an object with an unsubscribe method.
 * @returns {void}
 *
 * If the argument is a function, isBlobOrFileLikeObject will be called with no arguments. If isBlobOrFileLikeObject is an object with an unsubscribe method, that method will be called.
 */
function handleObservableOrUnsubscribe(observableOrFunction) {
  // Check if the argument is a function using the global utility gl.isFunction
  if (gl.isFunction(observableOrFunction)) {
    // If isBlobOrFileLikeObject'createInteractionAccessor a function, invoke isBlobOrFileLikeObject
    observableOrFunction();
  } else {
    // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor an object with an unsubscribe method and call isBlobOrFileLikeObject
    observableOrFunction.unsubscribe();
  }
}

module.exports = handleObservableOrUnsubscribe;