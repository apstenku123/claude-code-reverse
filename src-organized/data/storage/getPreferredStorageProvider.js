/**
 * Returns the preferred storage provider based on the current environment.
 *
 * If running in a web worker (self) and indexedDB is available, returns a new instance of IndexedDBStorageProvider.
 * If running in a browser window and localStorage is available, returns the window'createInteractionAccessor localStorage object.
 * Otherwise, returns the fallback storage provider.
 *
 * @returns {object} The preferred storage provider instance or object.
 */
function getPreferredStorageProvider() {
  // Check if running in a web worker environment with indexedDB support
  if (typeof self === "object" && self.indexedDB) {
    // Return a new instance of the IndexedDB storage provider
    return new IndexedDBStorageProvider();
  }

  // Check if running in a browser window with localStorage support
  if (typeof window === "object" && window.localStorage) {
    // Return the browser'createInteractionAccessor localStorage object
    return window.localStorage;
  }

  // Fallback to the default storage provider
  return fallbackStorageProvider;
}

module.exports = getPreferredStorageProvider;