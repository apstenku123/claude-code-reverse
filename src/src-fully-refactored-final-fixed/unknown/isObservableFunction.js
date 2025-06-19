/**
 * Checks if the given object'createInteractionAccessor [observable] property is a function.
 *
 * @param {Object} sourceObject - The object to check for an observable function property.
 * @returns {boolean} True if the [observable] property is a function, false otherwise.
 */
function isObservableFunction(sourceObject) {
  // Access the observable property key from the global hq9 object
  // and check if isBlobOrFileLikeObject'createInteractionAccessor a function using mq9.isFunction
  return mq9.isFunction(sourceObject[hq9.observable]);
}

module.exports = isObservableFunction;