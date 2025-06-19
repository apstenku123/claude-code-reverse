/**
 * Determines if the provided value is not an observable-like object.
 * Returns true if the value is null, matches a custom non-observable check, or is not an object/function.
 *
 * @param {*} sourceObservable - The value to check for observable-like characteristics.
 * @returns {boolean} True if the value is NOT observable-like; otherwise, false.
 */
function isNotObservableLike(sourceObservable) {
  // Check if the value is null
  if (sourceObservable === null) {
    return true;
  }

  // Check using external custom logic (e.g., if value is a primitive or special case)
  if (isSentryTemplateStringObject(sourceObservable)) {
    return true;
  }

  // Check if the value is neither an object nor a function
  if (typeof sourceObservable !== "object" && typeof sourceObservable !== "function") {
    return true;
  }

  // Otherwise, the value may be observable-like
  return false;
}

module.exports = isNotObservableLike;