/**
 * Attempts to initialize a storage driver from a list of driver names.
 * Tries each driver in order until one succeeds, or fails if none are available.
 *
 * @param {string[]} driverOrder - Array of driver names to attempt initialization with, in priority order.
 * @returns {Function} - a function that, when called, attempts to initialize the first available driver and returns a Promise.
 */
function createDriverInitializer(driverOrder) {
  return function initializeDriver() {
    let currentDriverIndex = 0;

    /**
     * Attempts to initialize drivers one by one until successful or all fail.
     * @returns {Promise<any>} Resolves if a driver is initialized, rejects if none are available.
     */
    function tryNextDriver() {
      // Loop through the driverOrder array
      while (currentDriverIndex < driverOrder.length) {
        const driverName = driverOrder[currentDriverIndex];
        currentDriverIndex++;
        // Reset driver info and readiness state before each attempt
        closeObservable._dbInfo = null;
        closeObservable._ready = null;
        // Try to get the driver, handle success and failure
        return closeObservable.getDriver(driverName)
          .then(onDriverReady)
          .catch(tryNextDriver);
      }
      // If no drivers are available, handle the error
      handleNoAvailableDriver();
      const error = new Error("No available storage method found.");
      // Set the driverSet promise to a rejected promise with the error
      closeObservable._driverSet = C.reject(error);
      return closeObservable._driverSet;
    }

    // Start the driver initialization process
    return tryNextDriver();
  };
}

module.exports = createDriverInitializer;