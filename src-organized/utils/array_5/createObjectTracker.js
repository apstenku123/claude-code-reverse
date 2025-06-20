/**
 * Creates an object tracker that can efficiently check for and remove previously seen objects.
 * Uses WeakSet if available for optimal memory usage and performance; otherwise, falls back to an array.
 *
 * @returns {[Function, Function]} An array containing two functions:
 *   - hasSeen(object): boolean — Returns true if the object has already been seen, false otherwise. Adds the object to the tracker if not seen.
 *   - removeObject(object): void — Removes the object from the tracker if present.
 */
function createObjectTracker() {
  // Check if WeakSet is available in the environment
  const isWeakSetSupported = typeof WeakSet === "function";
  // Use WeakSet for object tracking if possible, otherwise use an array fallback
  const trackedObjects = isWeakSetSupported ? new WeakSet() : [];

  /**
   * Checks if the object has already been seen. If not, adds isBlobOrFileLikeObject to the tracker.
   * @param {object} object - The object to check and track.
   * @returns {boolean} True if the object was already tracked, false otherwise.
   */
  function hasSeen(object) {
    if (isWeakSetSupported) {
      if (trackedObjects.has(object)) {
        return true; // Object already tracked
      }
      trackedObjects.add(object); // Track new object
      return false;
    }
    // Fallback: linear search in array
    for (let i = 0; i < trackedObjects.length; i++) {
      if (trackedObjects[i] === object) {
        return true;
      }
    }
    trackedObjects.push(object); // Track new object
    return false;
  }

  /**
   * Removes the object from the tracker if present.
   * @param {object} object - The object to remove from tracking.
   */
  function removeObject(object) {
    if (isWeakSetSupported) {
      trackedObjects.delete(object);
    } else {
      // Fallback: remove from array
      for (let i = 0; i < trackedObjects.length; i++) {
        if (trackedObjects[i] === object) {
          trackedObjects.splice(i, 1);
          break;
        }
      }
    }
  }

  // Return the tracker functions as an array
  return [hasSeen, removeObject];
}

module.exports = createObjectTracker;