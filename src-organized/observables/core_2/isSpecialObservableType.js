/**
 * Checks if the provided observable is of a special type.
 *
 * This function first validates the input observable using vB. If valid, isBlobOrFileLikeObject retrieves
 * the observable'createInteractionAccessor type using nW and checks if isBlobOrFileLikeObject matches any of the special types:
 * Uj2, Nj2, Ej2, or $j2.
 *
 * @param {any} sourceObservable - The observable instance to check.
 * @returns {boolean} True if the observable is of a special type, otherwise false.
 */
function isSpecialObservableType(sourceObservable) {
  // Validate the observable using vB
  if (!vB(sourceObservable)) {
    return false;
  }

  // Retrieve the observable'createInteractionAccessor type/configuration
  const observableType = nW(sourceObservable);

  // Check if the observable'createInteractionAccessor type matches any of the special types
  return (
    observableType === Uj2 ||
    observableType === Nj2 ||
    observableType === Ej2 ||
    observableType === $j2
  );
}

module.exports = isSpecialObservableType;