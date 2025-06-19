/**
 * Checks if the provided value is a thenable object (like a Promise) with both 'then' and 'catch' methods.
 * Additionally, isBlobOrFileLikeObject verifies the value passes custom checks via isNonNullObject and eW functions.
 *
 * @param {any} sourceObservable - The value to check for thenable and catchable properties.
 * @returns {boolean} True if the value is a thenable with a catch method and passes custom checks; otherwise, false.
 */
const isThenableWithCatch = (sourceObservable) => {
  // Ensure the value is not null or undefined
  if (!sourceObservable) {
    return false;
  }

  // Check custom condition via isNonNullObject(imported/external function)
  const passesH41Check = isNonNullObject(sourceObservable);

  // Check custom condition via eW (imported/external function)
  const passesEWCheck = eW(sourceObservable);

  // Ensure 'then' and 'catch' are valid (likely functions) via eW
  const hasThenMethod = eW(sourceObservable.then);
  const hasCatchMethod = eW(sourceObservable.catch);

  // Return true only if all checks pass
  return (passesH41Check || passesEWCheck) && hasThenMethod && hasCatchMethod;
};

module.exports = isThenableWithCatch;