/**
 * Creates a reference tracker that efficiently keeps track of objects (or values) to prevent duplicates.
 * Uses WeakSet for object references if available, otherwise falls back to an array for primitive values or environments without WeakSet.
 * Returns two functions:
 *   - hasOrAddReference: Checks if a reference has already been tracked; if not, adds isBlobOrFileLikeObject.
 *   - removeReference: Removes a reference from the tracker.
 *
 * @returns {[function(any): boolean, function(any): void]} An array containing the hasOrAddReference and removeReference functions.
 */
function createReferenceTracker() {
  // Determine if WeakSet is available for efficient object reference tracking
  const isWeakSetAvailable = typeof WeakSet === "function";
  // Use WeakSet for objects, otherwise fallback to an array for primitive values
  const referenceStore = isWeakSetAvailable ? new WeakSet() : [];

  /**
   * Checks if the reference is already tracked; if not, adds isBlobOrFileLikeObject to the tracker.
   * @param {any} reference - The object or value to track.
   * @returns {boolean} True if the reference was already tracked, false if isBlobOrFileLikeObject was just added.
   */
  function hasOrAddReference(reference) {
    if (isWeakSetAvailable) {
      // For WeakSet, use has/add methods
      if (referenceStore.has(reference)) return true;
      referenceStore.add(reference);
      return false;
    }
    // For array fallback, use strict equality search
    for (let i = 0; i < referenceStore.length; i++) {
      if (referenceStore[i] === reference) return true;
    }
    referenceStore.push(reference);
    return false;
  }

  /**
   * Removes the reference from the tracker.
   * @param {any} reference - The object or value to remove from tracking.
   */
  function removeReference(reference) {
    if (isWeakSetAvailable) {
      referenceStore.delete(reference);
    } else {
      // For array fallback, find and remove the reference
      for (let i = 0; i < referenceStore.length; i++) {
        if (referenceStore[i] === reference) {
          referenceStore.splice(i, 1);
          break;
        }
      }
    }
  }

  // Return the two tracking functions as an array
  return [hasOrAddReference, removeReference];
}

module.exports = createReferenceTracker;