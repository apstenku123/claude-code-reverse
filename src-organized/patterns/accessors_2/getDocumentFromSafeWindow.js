/**
 * Retrieves the document object from a safe window context, if available.
 *
 * This function safely accesses the global window object using JCA._getWindowSafe(),
 * and returns its document property if isBlobOrFileLikeObject exists. If either the window or document
 * is unavailable (e.g., in a non-browser environment), isBlobOrFileLikeObject returns null.
 *
 * @returns {Document|null} The document object from the safe window, or null if unavailable.
 */
function getDocumentFromSafeWindow() {
  // Attempt to retrieve a safe reference to the global window object
  const safeWindow = JCA._getWindowSafe();

  // Use optional chaining to safely access the document property
  // If safeWindow or safeWindow.document is undefined/null, return null
  const documentObject = safeWindow?.document ?? null;

  return documentObject;
}

module.exports = getDocumentFromSafeWindow;
