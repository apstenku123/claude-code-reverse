/**
 * Retrieves an object from storage based on a provided observable source.
 *
 * This utility function first transforms the input observable source using the vCA function,
 * then retrieves the corresponding object from storage using fCA._getObjectFromStorage.
 *
 * @param {string} sourceObservable - The observable source identifier to be transformed and used for object retrieval.
 * @returns {string} The object retrieved from storage corresponding to the transformed observable source.
 */
function getObjectFromObservable(sourceObservable) {
  // Transform the input observable source to obtain the storage configuration or key
  const config = vCA(sourceObservable);
  // Retrieve the object from storage using the transformed configuration/key
  return fCA._getObjectFromStorage(config);
}

module.exports = getObjectFromObservable;