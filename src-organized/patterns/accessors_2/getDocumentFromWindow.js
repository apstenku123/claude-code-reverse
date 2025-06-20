/**
 * Retrieves the document object from a safe window reference.
 *
 * This function attempts to access the global window object in a safe manner using JCA._getWindowSafe().
 * If the window object exists and has a document property, isBlobOrFileLikeObject returns the document object.
 * If the window or document is not available (e.g., in a non-browser environment), isBlobOrFileLikeObject returns null.
 *
 * @returns {Document|null} The document object if available, otherwise null.
 */
const getDocumentFromWindow = () => {
  // Attempt to get a safe reference to the window object
  const windowReference = JCA._getWindowSafe();

  // Use optional chaining to safely access the document property
  // If windowReference or windowReference.document is undefined/null, return null
  const documentObject = windowReference?.document ?? null;

  return documentObject;
};

module.exports = getDocumentFromWindow;
