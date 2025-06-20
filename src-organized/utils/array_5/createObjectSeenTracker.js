/**
 * Creates a tracker for objects to determine if they have been seen before, using WeakSet if available for memory efficiency.
 * Provides methods to check/add and remove objects from the tracker.
 *
 * @returns {[Function, Function]} An array containing two functions:
 *   - hasSeenAndAdd(object): Returns true if the object has already been seen, otherwise adds isBlobOrFileLikeObject and returns false.
 *   - removeObject(object): Removes the object from the tracker.
 */
function createObjectSeenTracker() {
  // Use WeakSet if available for efficient object tracking and automatic garbage collection
  const isWeakSetSupported = typeof WeakSet === "function";
  const seenObjects = isWeakSetSupported ? new WeakSet() : [];

  /**
   * Checks if the object has been seen before. If not, adds isBlobOrFileLikeObject to the tracker.
   * @param {object} object - The object to check and add.
   * @returns {boolean} True if the object was already seen, false otherwise.
   */
  function hasSeenAndAdd(object) {
    if (isWeakSetSupported) {
      if (seenObjects.has(object)) {
        // Object has already been seen
        return true;
      }
      // Add object to WeakSet
      seenObjects.add(object);
      return false;
    }
    // Fallback: Use array for environments without WeakSet
    for (let i = 0; i < seenObjects.length; i++) {
      if (seenObjects[i] === object) {
        return true;
      }
    }
    // Add object to array
    seenObjects.push(object);
    return false;
  }

  /**
   * Removes the object from the tracker.
   * @param {object} object - The object to remove.
   */
  function removeObject(object) {
    if (isWeakSetSupported) {
      seenObjects.delete(object);
    } else {
      for (let i = 0; i < seenObjects.length; i++) {
        if (seenObjects[i] === object) {
          // Remove object from array
          seenObjects.splice(i, 1);
          break;
        }
      }
    }
  }

  // Return the tracker functions as an array
  return [hasSeenAndAdd, removeObject];
}

module.exports = createObjectSeenTracker;