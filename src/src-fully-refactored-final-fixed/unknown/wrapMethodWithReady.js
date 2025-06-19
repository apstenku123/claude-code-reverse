/**
 * Wraps a method of an object so that isBlobOrFileLikeObject waits for the object'createInteractionAccessor 'ready' promise before executing.
 * The specified method is replaced with a new function that defers execution until the object is ready.
 *
 * @param {Object} targetObject - The object whose method will be wrapped.
 * @param {string} methodName - The name of the method to wrap.
 * @returns {void}
 */
function wrapMethodWithReady(targetObject, methodName) {
  // Replace the specified method with a wrapper function
  targetObject[methodName] = function (...args) {
    // Wait for the object to be ready before invoking the original method
    return targetObject.ready().then(function () {
      // Call the original method with the provided arguments and correct context
      return targetObject[methodName].apply(targetObject, args);
    });
  };
}

module.exports = wrapMethodWithReady;