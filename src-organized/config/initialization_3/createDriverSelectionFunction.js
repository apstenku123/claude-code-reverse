/**
 * Attempts to initialize a storage driver from a list of driver names.
 * Tries each driver in order until one succeeds, or fails if none are available.
 *
 * @param {string[]} driverOrder - Array of driver names to attempt in order of preference.
 * @returns {Function} Function that, when called, attempts to set up the storage driver.
 */
function createDriverSelectionFunction(driverOrder) {
  /**
   * Attempts to initialize drivers one by one until successful or all fail.
   *
   * @returns {Promise<any>} Resolves when a driver is set, or rejects if none are available.
   */
  function tryNextDriver() {
    let currentIndex = 0;

    /**
     * Recursive function to attempt each driver in the list.
     *
     * @returns {Promise<any>} Resolves or rejects based on driver initialization.
     */
    function attemptDriver() {
      while (currentIndex < driverOrder.length) {
        const driverName = driverOrder[currentIndex];
        currentIndex++;
        // Reset driver info and readiness state before each attempt
        closeObservable._dbInfo = null;
        closeObservable._ready = null;
        // Try to get and initialize the driver
        return closeObservable.getDriver(driverName)
          .then(initializeStorageWithConfig) // initializeStorageWithConfig: success handler (external)
          .catch(attemptDriver); // Try next driver on failure
      }
      // If all drivers fail, handle the error
      initializeDriverInConfig(); // initializeDriverInConfig: external error handler (side effect)
      const error = new Error("No available storage method found.");
      // Set the driverSet promise to a rejected state
      closeObservable._driverSet = C.reject(error);
      return closeObservable._driverSet;
    }

    return attemptDriver();
  }

  return tryNextDriver;
}

module.exports = createDriverSelectionFunction;