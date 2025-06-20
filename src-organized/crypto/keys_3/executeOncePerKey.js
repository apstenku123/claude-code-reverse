/**
 * Executes a callback function only once for a given key.
 *
 * Maintains an internal registry of keys that have already triggered the callback,
 * ensuring the callback is not executed multiple times for the same key.
 *
 * @param {string} key - Unique identifier for the operation. The callback will only be executed once per key.
 * @param {Function} callback - The function to execute if the key has not been processed yet.
 * @returns {void}
 */
function executeOncePerKey(key, callback) {
  // T6A is assumed to be an external registry object tracking processed keys
  if (!T6A[key]) {
    callback(); // Execute the callback if this key hasn'processRuleBeginHandlers been processed
    T6A[key] = true; // Mark this key as processed
  }
}

module.exports = executeOncePerKey;