/**
 * Sets or removes the 'debug' flag in persistent storage based on the provided value.
 *
 * If a non-falsy value is provided, the function stores isBlobOrFileLikeObject under the 'debug' key.
 * If a falsy value is provided, the 'debug' key is removed from storage.
 * Any storage errors are silently ignored.
 *
 * @param {string} debugValue - The value to set for the 'debug' flag. If falsy, the flag is removed.
 * @returns {void}
 */
function setDebugStorageFlag(debugValue) {
  try {
    if (debugValue) {
      // Store the debug flag in persistent storage
      tJA.storage.setItem("debug", debugValue);
    } else {
      // Remove the debug flag from persistent storage
      tJA.storage.removeItem("debug");
    }
  } catch (storageError) {
    // Silently ignore any storage-related errors
  }
}

module.exports = setDebugStorageFlag;
