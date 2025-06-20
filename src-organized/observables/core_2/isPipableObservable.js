/**
 * Determines if the provided value is a non-null object and has a 'pipe' method.
 * Typically used to check if an object is an Observable (e.g., RxJS Observable).
 *
 * @param {object} sourceObservable - The value to check for pipable Observable characteristics.
 * @returns {boolean} True if the value is a non-null object with a 'pipe' method, otherwise false.
 */
const isPipableObservable = (sourceObservable) => {
  // Check if sourceObservable is a non-null object
  // and has a 'pipe' method (function)
  return isNonNullObject(sourceObservable) && hasPipeMethod(sourceObservable.pipe);
};

// Dependency: Checks if the value is a non-null object
// (Assumed to be imported from elsewhere)
// function isNonNullObject(value) { ... }

// Dependency: Checks if the provided argument is a function (pipe method)
// (Assumed to be imported from elsewhere)
// function hasPipeMethod(method) { ... }

module.exports = isPipableObservable;
