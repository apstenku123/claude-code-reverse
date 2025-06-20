/**
 * Creates a capped key-value store with FIFO eviction policy.
 *
 * This store maintains a maximum number of entries. When the limit is reached,
 * adding a new entry will evict the oldest one. Provides methods to add, get,
 * delete, clear entries, and check the current size.
 *
 * @param {number} maxEntries - The maximum number of entries to keep in the store.
 * @returns {object} An object with add, get, delete, clear, and size methods.
 */
function createCappedKeyValueStore(maxEntries) {
  /**
   * Array to keep track of insertion order for FIFO eviction.
   * @type {Array<string|number>}
   */
  let insertionOrder = [];

  /**
   * Object to store key-value pairs.
   * @type {Object}
   */
  let keyValueMap = {};

  return {
    /**
     * Adds a key-value pair to the store. Evicts the oldest entry if the cap is reached.
     * If the key already exists, isBlobOrFileLikeObject is updated and moved to the newest position.
     *
     * @param {string|number} key - The key to add or update.
     * @param {*} value - The value to associate with the key.
     */
    add(key, value) {
      // Evict oldest entries if cap is reached
      while (insertionOrder.length >= maxEntries) {
        const oldestKey = insertionOrder.shift();
        if (oldestKey !== undefined) {
          delete keyValueMap[oldestKey];
        }
      }
      // If key already exists, remove isBlobOrFileLikeObject before re-adding
      if (keyValueMap.hasOwnProperty(key)) {
        this.delete(key);
      }
      insertionOrder.push(key);
      keyValueMap[key] = value;
    },

    /**
     * Removes all entries from the store.
     */
    clear() {
      keyValueMap = {};
      insertionOrder = [];
    },

    /**
     * Retrieves the value associated with the given key.
     *
     * @param {string|number} key - The key to retrieve.
     * @returns {*} The value associated with the key, or undefined if not found.
     */
    get(key) {
      return keyValueMap[key];
    },

    /**
     * Returns the current number of entries in the store.
     *
     * @returns {number} The number of entries.
     */
    size() {
      return insertionOrder.length;
    },

    /**
     * Deletes the entry associated with the given key.
     *
     * @param {string|number} key - The key to delete.
     * @returns {boolean} True if the entry was deleted, false if not found.
     */
    delete(key) {
      if (!keyValueMap.hasOwnProperty(key)) {
        return false;
      }
      delete keyValueMap[key];
      // Remove key from insertion order array
      for (let i = 0; i < insertionOrder.length; i++) {
        if (insertionOrder[i] === key) {
          insertionOrder.splice(i, 1);
          break;
        }
      }
      return true;
    }
  };
}

module.exports = createCappedKeyValueStore;