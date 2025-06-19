/**
 * Retrieves the property 'operateWithLeadingTrailing' from the provided observable source using the createObservableResult utility.
 *
 * @param {object} sourceObservable - The observable or source object from which to retrieve property 'operateWithLeadingTrailing'.
 * @returns {*} The value of property 'operateWithLeadingTrailing' from the source observable, as determined by createObservableResult.
 */
function getObservablePropertyN(sourceObservable) {
  // Call the createObservableResult utility with property key 'operateWithLeadingTrailing', the source observable, and undefined as the third argument
  return createObservableResult("operateWithLeadingTrailing", sourceObservable, undefined);
}

module.exports = getObservablePropertyN;