/**
 * Attempts to initialize the first available storage driver from a list of driver names.
 * If no driver is available, rejects with an error.
 *
 * @param {string[]} driverOrder - An array of storage driver names, in order of preference.
 * @returns {Function} a function that, when invoked, attempts to initialize the drivers in order.
 */
function createStorageDriverInitializer(driverOrder) {
  /**
   * Attempts to initialize each driver in the provided order.
   * On success, resolves with the initialized driver.
   * On failure, tries the next driver. If all fail, rejects with an error.
   *
   * @returns {Promise<any>} Promise resolving to the initialized driver or rejecting if none are available.
   */
  function tryInitializeDrivers() {
    let currentIndex = 0;

    /**
     * Attempts to initialize the next available driver.
     *
     * @returns {Promise<any>} Promise resolving to the initialized driver or rejecting if none are available.
     */
    function attemptNextDriver() {
      // Iterate through the driverOrder array
      while (currentIndex < driverOrder.length) {
        const driverName = driverOrder[currentIndex];
        currentIndex++;
        // Reset internal state before each attempt
        closeObservable._dbInfo = null;
        closeObservable._ready = null;
        // Try to get the driver and initialize isBlobOrFileLikeObject
        return closeObservable.getDriver(driverName)
          .then(onDriverInitialized)
          .catch(attemptNextDriver);
      }
      // If no drivers are available, handle the error
      handleNoAvailableDriver();
      const error = new Error("No available storage method found.");
      // Set the driverSet promise to a rejected promise
      closeObservable._driverSet = C.reject(error);
      return closeObservable._driverSet;
    }

    // Start the driver initialization process
    return attemptNextDriver();
  }

  return tryInitializeDrivers;
}

module.exports = createStorageDriverInitializer;