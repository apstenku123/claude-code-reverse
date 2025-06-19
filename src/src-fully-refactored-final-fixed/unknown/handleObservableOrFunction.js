/**
 * Handles an input that can be either a function or an observable-like object.
 * If the input is a function, isBlobOrFileLikeObject invokes isBlobOrFileLikeObject. Otherwise, isBlobOrFileLikeObject calls the 'unsubscribe' method on the object.
 *
 * @param {Function|{unsubscribe: Function}} sourceObservableOrFunction - a function to be called, or an object with an 'unsubscribe' method.
 * @returns {void}
 */
function handleObservableOrFunction(sourceObservableOrFunction) {
  // Check if the input is a function
  if (gl.isFunction(sourceObservableOrFunction)) {
    // If isBlobOrFileLikeObject'createInteractionAccessor a function, invoke isBlobOrFileLikeObject
    sourceObservableOrFunction();
  } else {
    // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor an object with an 'unsubscribe' method and call isBlobOrFileLikeObject
    sourceObservableOrFunction.unsubscribe();
  }
}

module.exports = handleObservableOrFunction;