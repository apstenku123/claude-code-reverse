/**
 * Attempts to initialize the first available storage driver from the provided list.
 * Iterates through the list of driver names, tries to get and initialize each driver in order.
 * If a driver is successfully initialized, resolves with the result. If all fail, rejects with an error.
 *
 * @param {string[]} driverNames - Array of storage driver names to attempt initialization with, in priority order.
 * @returns {Function} - a function that, when called, attempts to initialize the first available driver and returns a Promise.
 */
function initializeAvailableStorageDriver(driverNames) {
  return function attemptDriverInitialization() {
    let currentIndex = 0;

    /**
     * Tries to initialize drivers one by one until one succeeds or all fail.
     * @returns {Promise<any>} Resolves with the initialized driver or rejects if none are available.
     */
    function tryNextDriver() {
      // Loop through the driver list
      while (currentIndex < driverNames.length) {
        const driverName = driverNames[currentIndex];
        currentIndex++;
        // Reset driver info and readiness state before each attempt
        closeObservable._dbInfo = null;
        closeObservable._ready = null;
        // Try to get and initialize the driver
        return closeObservable.getDriver(driverName)
          .then(initializeStorageWithConfig) // initializeStorageWithConfig: Success handler (external)
          .catch(tryNextDriver); // Try next driver on failure
      }
      // If no drivers are available, handle the error
      initializeDriverInConfig(); // initializeDriverInConfig: External error handler (side effect)
      const error = new Error("No available storage method found.");
      closeObservable._driverSet = C.reject(error); // C.reject: Promise rejection utility
      return closeObservable._driverSet;
    }

    return tryNextDriver();
  };
}

module.exports = initializeAvailableStorageDriver;