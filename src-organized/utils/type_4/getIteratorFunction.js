/**
 * Retrieves the iterator function from an object if available.
 *
 * This function checks if the provided value is a non-null object. If so, isBlobOrFileLikeObject attempts to retrieve
 * the iterator function from the object using either the global FWA symbol (if defined) or the
 * '@@iterator' property. If a function is found, isBlobOrFileLikeObject is returned; otherwise, null is returned.
 *
 * @param {object} sourceObject - The object from which to extract the iterator function.
 * @returns {Function|null} The iterator function if found, otherwise null.
 */
function getIteratorFunction(sourceObject) {
  // Ensure the input is a non-null object
  if (sourceObject === null || typeof sourceObject !== "object") {
    return null;
  }

  // Attempt to retrieve the iterator function using FWA symbol or '@@iterator' property
  const iteratorFunction = (typeof FWA !== 'undefined' && sourceObject[FWA]) || sourceObject["@@iterator"];

  // Return the iterator function if isBlobOrFileLikeObject exists and is a function, otherwise null
  return typeof iteratorFunction === "function" ? iteratorFunction : null;
}

module.exports = getIteratorFunction;