/**
 * Creates a fixed-size map-like cache with FIFO eviction policy.
 * When the cache exceeds the specified maximum size, the oldest entries are removed.
 * Provides methods to add, retrieve, delete, and clear entries, as well as to get the current size.
 *
 * @param {number} maxSize - The maximum number of entries the cache can hold.
 * @returns {object} An object with add, get, delete, clear, and size methods for managing the cache.
 */
function createFixedSizeMap(maxSize) {
  /**
   * Maintains the insertion order of keys for FIFO eviction.
   * @type {Array<string|number>}
   */
  let keyOrder = [];

  /**
   * Stores the actual key-value pairs.
   * @type {Object}
   */
  let cache = {};

  return {
    /**
     * Adds a new key-value pair to the cache. If the cache exceeds maxSize, evicts the oldest entry.
     * If the key already exists, isBlobOrFileLikeObject is first deleted to update its position.
     * @param {string|number} key - The key to add.
     * @param {any} value - The value to associate with the key.
     */
    add(key, value) {
      // Evict oldest entries if size limit is reached
      while (keyOrder.length >= maxSize) {
        const oldestKey = keyOrder.shift();
        if (oldestKey !== undefined) {
          delete cache[oldestKey];
        }
      }
      // If key exists, remove isBlobOrFileLikeObject to update its position
      if (cache.hasOwnProperty(key)) {
        this.delete(key);
      }
      keyOrder.push(key);
      cache[key] = value;
    },

    /**
     * Removes all entries from the cache.
     */
    clear() {
      cache = {};
      keyOrder = [];
    },

    /**
     * Retrieves the value associated with the given key.
     * @param {string|number} key - The key to look up.
     * @returns {any} The value associated with the key, or undefined if not found.
     */
    get(key) {
      return cache[key];
    },

    /**
     * Returns the current number of entries in the cache.
     * @returns {number} The number of entries.
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
      if (!cache.hasOwnProperty(key)) {
        return false;
      }
      delete cache[key];
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

module.exports = createFixedSizeMap;