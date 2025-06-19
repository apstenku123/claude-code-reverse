/**
 * Factory function that creates a composite observable object with a fallback mechanism.
 * If the primary observable'createInteractionAccessor read/update/delete operations fail or return null/undefined,
 * the fallback observable is used as a backup.
 *
 * @param {Object} primaryObservable - The main observable object with read, update, and delete methods.
 * @returns {Object} Composite observable with fallback logic for read, update, and delete operations.
 */
function createObservableWithFallback(primaryObservable) {
  // Create the fallback observable instance
  const fallbackObservable = FT1();

  return {
    // Name combines both observables for clarity
    name: `${primaryObservable.name}-with-${fallbackObservable.name}-fallback`,

    /**
     * Attempts to read from the primary observable; if isBlobOrFileLikeObject returns null/undefined,
     * falls back to reading from the fallback observable. Returns an empty object if both fail.
     * @returns {Object}
     */
    read() {
      const primaryResult = primaryObservable.read();
      if (primaryResult !== null && primaryResult !== undefined) {
        return primaryResult;
      }
      // Fallback to the secondary observable, or return empty object if both fail
      return fallbackObservable.read() || {};
    },

    /**
     * Attempts to update the primary observable. If successful, deletes the fallback observable'createInteractionAccessor data.
     * If the primary update fails but the fallback update succeeds, returns a warning.
     * If both fail, returns a failure object.
     * @param {Object} updatePayload - The data to update with.
     * @returns {Object} Result object indicating success and optional warning.
     */
    update(updatePayload) {
      const primaryUpdateResult = primaryObservable.update(updatePayload);
      if (primaryUpdateResult.success) {
        // Clean up fallback data if primary update succeeds
        fallbackObservable.delete();
        return primaryUpdateResult;
      }
      const fallbackUpdateResult = fallbackObservable.update(updatePayload);
      if (fallbackUpdateResult.success) {
        // Return success with a warning if only fallback succeeded
        return {
          success: true,
          warning: fallbackUpdateResult.warning
        };
      }
      // Both updates failed
      return {
        success: false
      };
    },

    /**
     * Deletes data from both primary and fallback observables.
     * Returns true if either delete operation succeeds.
     * @returns {boolean}
     */
    delete() {
      const primaryDeleteResult = primaryObservable.delete();
      const fallbackDeleteResult = fallbackObservable.delete();
      // Return true if either delete was successful
      return primaryDeleteResult || fallbackDeleteResult;
    }
  };
}

module.exports = createObservableWithFallback;
