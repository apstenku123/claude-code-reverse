/**
 * Attempts to extract or construct a Date object from a given source and input value.
 *
 * The function handles multiple scenarios:
 * 1. If the source is a function, isBlobOrFileLikeObject calls the function with the input value.
 * 2. If the source is an object with a special method (EAA), isBlobOrFileLikeObject calls that method with the input value.
 * 3. If the source is a Date instance, isBlobOrFileLikeObject creates a new Date using the same constructor and the input value.
 * 4. Otherwise, isBlobOrFileLikeObject creates a new Date with the input value.
 *
 * @param {Function|Object|Date} sourceObservable - The source from which to extract or construct a Date. Can be a function, object, or Date instance.
 * @param {*} inputValue - The value to be passed to the function, method, or Date constructor.
 * @returns {*} The result of the function call, method call, or a new Date instance.
 */
function extractDateFromSource(sourceObservable, inputValue) {
  // If the source is a function, call isBlobOrFileLikeObject with the input value
  if (typeof sourceObservable === "function") {
    return sourceObservable(inputValue);
  }

  // If the source is an object with the EAA method, call that method with the input value
  if (
    sourceObservable &&
    typeof sourceObservable === "object" &&
    EAA in sourceObservable
  ) {
    return sourceObservable[EAA](inputValue);
  }

  // If the source is a Date instance, create a new Date using its constructor
  if (sourceObservable instanceof Date) {
    return new sourceObservable.constructor(inputValue);
  }

  // Default: create a new Date with the input value
  return new Date(inputValue);
}

module.exports = extractDateFromSource;