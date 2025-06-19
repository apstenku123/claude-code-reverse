/**
 * Wraps the provided observable with DOMError handling using the isObjectType utility.
 *
 * @param {any} sourceObservable - The observable or value to be wrapped or checked for DOMError handling.
 * @returns {any} The result of applying the isObjectType utility with 'DOMError' to the sourceObservable.
 */
function wrapWithDomError(sourceObservable) {
  // Use the isObjectType utility to process the observable with 'DOMError' handling
  return isObjectType(sourceObservable, "DOMError");
}

module.exports = wrapWithDomError;