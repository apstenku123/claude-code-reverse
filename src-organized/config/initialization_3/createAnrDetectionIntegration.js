/**
 * Creates an ANR (Application Not Responding) detection integration for Node.js applications.
 * This integration ensures that the Node.js version is compatible, sets up the necessary scopes,
 * and manages the lifecycle of an ANR detection worker.
 *
 * @param {Object} [workerOptions={}] - Optional configuration options for the ANR worker.
 * @returns {Object} An integration object with setup and worker management methods.
 */
function createAnrDetectionIntegration(workerOptions = {}) {
  // Ensure Node.js version is 16.17.0 or later
  if (
    deepCloneWithCycleDetection$1.NODE_VERSION.major < 16 ||
    (deepCloneWithCycleDetection$1.NODE_VERSION.major === 16 && deepCloneWithCycleDetection$1.NODE_VERSION.minor < 17)
  ) {
    throw new Error("ANR detection requires Node 16.17.0 or later");
  }

  /**
   * Holds the promise returned by the worker starter, if running
   * @type {Promise<Function>|undefined}
   */
  let workerPromise;

  /**
   * Holds the worker setup function provided in setup()
   * @type {Function|undefined}
   */
  let workerSetupFunction;

  // Get the current Sentry integration scopes object
  const sentryScopes = WG9();
  // Attach the Sentry scopes getter
  sentryScopes.__SENTRY_GET_SCOPES__ = initializeAndMergeGlobalScopeData;

  return {
    /**
     * Name of the integration
     */
    name: tZA,

    /**
     * No-op setupOnce method for integration interface compliance
     */
    setupOnce() {},

    /**
     * Starts the ANR detection worker if not already started and setup function is present
     */
    startWorker: function () {
      if (workerPromise) return; // Already started
      if (workerSetupFunction) {
        // Start the worker and store the promise
        workerPromise = initializeAnrWorker(workerSetupFunction, workerOptions);
      }
    },

    /**
     * Stops the ANR detection worker if running
     */
    stopWorker: function () {
      if (workerPromise) {
        // Wait for the worker promise to resolve, then call the returned cleanup function
        workerPromise.then(stopFunction => {
          stopFunction();
          workerPromise = undefined;
        });
      }
    },

    /**
     * Sets up the worker with the provided setup function and starts the worker asynchronously
     * @param {Function} setupFunction - The function to initialize the worker
     */
    setup: function (setupFunction) {
      workerSetupFunction = setupFunction;
      // Start the worker on the next event loop tick
      setImmediate(() => this.startWorker());
    }
  };
}

module.exports = createAnrDetectionIntegration;
