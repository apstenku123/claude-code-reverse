/**
 * Extracts the 'operateWithLeadingTrailing' property from the given observable using the createObservableResult utility function.
 *
 * @param {Object} sourceObservable - The observable object from which to extract the 'operateWithLeadingTrailing' property.
 * @returns {any} The value of the 'operateWithLeadingTrailing' property extracted from the observable, or undefined if not found.
 */
function extractNPropertyFromObservable(sourceObservable) {
  // Calls the createObservableResult utility to extract the 'operateWithLeadingTrailing' property from the observable
  return createObservableResult("operateWithLeadingTrailing", sourceObservable, undefined);
}

module.exports = extractNPropertyFromObservable;