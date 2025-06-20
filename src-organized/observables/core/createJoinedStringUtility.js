/**
 * Creates a utility function that joins its arguments into a space-separated string,
 * applies the setObservableLevel transformation with the provided sourceObservable, and sets its prototype to createSpaceJoinedFunction.prototype.
 *
 * @param {Observable} sourceObservable - The observable source to be used by the utility function.
 * @returns {Function} The joined string utility function with the appropriate prototype.
 */
function createJoinedStringUtility(sourceObservable) {
  // Delegates to the imported createSpaceJoinedFunction function, which handles the creation logic
  return createSpaceJoinedFunction(sourceObservable);
}

module.exports = createJoinedStringUtility;