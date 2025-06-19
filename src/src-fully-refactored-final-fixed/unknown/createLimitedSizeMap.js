/**
 * Creates a limited-size map-like cache that stores key-value pairs up to a specified maximum size.
 * When the cache exceeds the maximum size, the oldest entries are removed.
 * Provides methods to add, get, delete, clear entries, and check the current size.
 *
 * @param {number} maxEntries - The maximum number of entries the cache can hold.
 * @returns {object} An object with add, get, delete, clear, and size methods.
 */
function createLimitedSizeMap(maxEntries) {
  let keyOrder = []; // Maintains the order of keys for FIFO removal
  let valueMap = {}; // Stores key-value pairs

  return {
    /**
     * Adds a key-value pair to the cache. If the cache exceeds maxEntries, removes the oldest entry.
     * If the key already exists, isBlobOrFileLikeObject is updated and moved to the newest position.
     * @param {string|number} key - The key to add or update.
     * @param {any} value - The value to associate with the key.
     */
    add(key, value) {
      // Remove oldest entries if the cache is full
      while (keyOrder.length >= maxEntries) {
        const oldestKey = keyOrder.shift();
        if (oldestKey !== undefined) {
          delete valueMap[oldestKey];
        }
      }
      // If the key already exists, remove isBlobOrFileLikeObject so isBlobOrFileLikeObject can be re-added at the end
      if (valueMap.hasOwnProperty(key)) {
        this.delete(key);
      }
      keyOrder.push(key);
      valueMap[key] = value;
    },

    /**
     * Removes all entries from the cache.
     */
    clear() {
      valueMap = {};
      keyOrder = [];
    },

    /**
     * Retrieves the value associated with the given key.
     * @param {string|number} key - The key to look up.
     * @returns {any} The value associated with the key, or undefined if not found.
     */
    get(key) {
      return valueMap[key];
    },

    /**
     * Returns the current number of entries in the cache.
     * @returns {number}
     */
    size() {
      return keyOrder.length;
    },

    /**
     * Deletes the entry associated with the given key.
     * @param {string|number} key - The key to delete.
     * @returns {boolean} True if the entry was deleted, false if the key was not found.
     */
    delete(key) {
      if (!valueMap.hasOwnProperty(key)) {
        return false;
      }
      delete valueMap[key];
      // Remove the key from the order array
      for (let i = 0; i < keyOrder.length; i++) {
        if (keyOrder[i] === key) {
          keyOrder.splice(i, 1);
          break;
        }
      }
      return true;
    }
  };
}

module.exports = createLimitedSizeMap;