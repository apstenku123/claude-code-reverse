/**
 * Creates a tracker for objects to efficiently check for duplicates and remove tracked objects.
 * Uses WeakSet if available for optimal memory usage with objects, otherwise falls back to an array.
 *
 * @returns {[trackObject: function, untrackObject: function]} An array containing two functions:
 *   - trackObject: Adds an object to the tracker and returns true if isBlobOrFileLikeObject was already tracked, false otherwise.
 *   - untrackObject: Removes an object from the tracker.
 */
function createObjectTracker() {
  // Check if WeakSet is supported (for efficient object tracking)
  const isWeakSetSupported = typeof WeakSet === "function";
  // Use WeakSet for objects if available, otherwise fallback to array
  const trackedObjects = isWeakSetSupported ? new WeakSet() : [];

  /**
   * Tracks the given object and checks if isBlobOrFileLikeObject was already tracked.
   * @param {object} objectToTrack - The object to track.
   * @returns {boolean} True if the object was already tracked, false otherwise.
   */
  function trackObject(objectToTrack) {
    if (isWeakSetSupported) {
      // If object is already tracked, return true
      if (trackedObjects.has(objectToTrack)) return true;
      // Otherwise, add to tracker and return false
      trackedObjects.add(objectToTrack);
      return false;
    }
    // Fallback: linear search in array
    for (let i = 0; i < trackedObjects.length; i++) {
      if (trackedObjects[i] === objectToTrack) return true;
    }
    // Not found, add to array
    trackedObjects.push(objectToTrack);
    return false;
  }

  /**
   * Removes the given object from the tracker.
   * @param {object} objectToUntrack - The object to remove from tracking.
   */
  function untrackObject(objectToUntrack) {
    if (isWeakSetSupported) {
      trackedObjects.delete(objectToUntrack);
    } else {
      // Fallback: linear search and remove from array
      for (let i = 0; i < trackedObjects.length; i++) {
        if (trackedObjects[i] === objectToUntrack) {
          trackedObjects.splice(i, 1);
          break;
        }
      }
    }
  }

  // Return the tracking and untracking functions
  return [trackObject, untrackObject];
}

module.exports = createObjectTracker;