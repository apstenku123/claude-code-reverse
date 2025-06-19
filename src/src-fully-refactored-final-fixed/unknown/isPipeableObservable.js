/**
 * Determines if the provided value is a non-null object that has a 'pipe' method.
 *
 * @param {object} sourceObservable - The value to check for being a pipeable observable.
 * @returns {boolean} True if the value is a non-null object with a 'pipe' method, otherwise false.
 */
const isPipeableObservable = (sourceObservable) => {
  // Check if the value is a non-null object
  const isObject = isNonNullObject(sourceObservable);
  // Check if the object has a 'pipe' method
  const hasPipeMethod = eW(sourceObservable.pipe);
  return isObject && hasPipeMethod;
};

module.exports = isPipeableObservable;
