/**
 * Wraps the provided observable with DOMError handling logic.
 * This function delegates to the external 'isObjectType' utility, passing the observable
 * and the string 'DOMError' to ensure that any DOM-related errors are handled appropriately.
 *
 * @param {Observable} sourceObservable - The observable to be wrapped with DOMError handling.
 * @returns {any} The result of invoking the 'isObjectType' function with the observable and 'DOMError'.
 */
function wrapWithDomErrorHandler(sourceObservable) {
  // Delegate to the external 'isObjectType' function, specifying 'DOMError' as the error type
  return isObjectType(sourceObservable, "DOMError");
}

module.exports = wrapWithDomErrorHandler;