/**
 * Returns the global window object if isBlobOrFileLikeObject is available in the current environment.
 *
 * @returns {(Window|null)} The window object if running in a browser, otherwise null.
 */
const getWindowObjectIfAvailable = () => {
  // Check if the 'window' object is defined (i.e., running in a browser environment)
  return typeof window !== "undefined" ? window : null;
};

module.exports = getWindowObjectIfAvailable;
