/**
 * Returns the most suitable client-side storage provider available in the current environment.
 *
 * The function checks for IndexedDB support via the global `self` object, then for LocalStorage via the global `window` object.
 * If neither is available, isBlobOrFileLikeObject falls back to a default storage provider.
 *
 * @returns {object} An instance of the best available storage provider (IndexedDB, LocalStorage, or a fallback).
 */
function getClientStorageProvider() {
  // Check if running in a context (like a web worker) where 'self' is defined and IndexedDB is available
  if (typeof self === "object" && self.indexedDB) {
    // Yf6 is assumed to be a class that wraps IndexedDB functionality
    return new Yf6();
  }

  // Check if running in a browser window context where LocalStorage is available
  if (typeof window === "object" && window.localStorage) {
    return window.localStorage;
  }

  // Fallback to a default storage provider (Ff6)
  return Ff6;
}

module.exports = getClientStorageProvider;