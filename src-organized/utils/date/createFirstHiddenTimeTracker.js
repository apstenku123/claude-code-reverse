/**
 * Tracks and provides access to the timestamp when the page was first hidden.
 *
 * If the first hidden time has not been set (is less than 0),
 * isBlobOrFileLikeObject initializes the visibility status and registers a listener
 * to capture the timestamp when the page becomes hidden.
 *
 * @returns {Object} An object with a getter for the first hidden timestamp.
 */
const createFirstHiddenTimeTracker = () => {
  // If the first hidden time is not set, initialize tracking
  if (firstHiddenTimestamp < 0) {
    updateVisibilityStatus(); // Checks and updates the current visibility status
    registerOnHiddenTimestampListener(); // Sets up a listener to capture the first hidden timestamp
  }

  return {
    /**
     * The timestamp (in ms since epoch) when the page was first hidden.
     * Remains constant after being set.
     */
    get firstHiddenTime() {
      return firstHiddenTimestamp;
    }
  };
};

module.exports = createFirstHiddenTimeTracker;
