/**
 * Initializes the ANR (Application Not Responding) detection integration for Node.js environments.
 * Ensures the Node.js version is compatible, sets up necessary scopes, and provides methods to manage the ANR worker lifecycle.
 *
 * @param {Object} [anrOptions={}] - Optional configuration options for the ANR worker.
 * @returns {Object} An object containing integration metadata and lifecycle management methods.
 */
function initializeAnrDetectionIntegration(anrOptions = {}) {
  // Ensure Node.js version is 16.17.0 or later
  const nodeVersion = deepCloneWithCycleDetection$1.NODE_VERSION;
  if (
    nodeVersion.major < 16 ||
    (nodeVersion.major === 16 && nodeVersion.minor < 17)
  ) {
    throw new Error("ANR detection requires Node 16.17.0 or later");
  }

  /**
   * Holds the promise returned by the ANR worker, if started.
   * @type {Promise<Function>|undefined}
   */
  let anrWorkerPromise;

  /**
   * Holds the subscription or configuration for the ANR worker.
   * @type {any}
   */
  let anrWorkerConfig;

  // Initialize the ANR integration context
  const anrIntegrationContext = WG9();
  // Attach the Sentry scopes getter
  anrIntegrationContext.__SENTRY_GET_SCOPES__ = initializeAndMergeGlobalScopeData;

  return {
    /**
     * Name of the integration (external constant)
     */
    name: tZA,

    /**
     * No-op setupOnce method (required by integration interface)
     */
    setupOnce() {},

    /**
     * Starts the ANR worker if not already started and configuration is present
     */
    startWorker: function () {
      if (anrWorkerPromise) return; // Worker already started
      if (anrWorkerConfig) {
        // Start the worker and store the promise
        anrWorkerPromise = initializeAnrWorker(anrWorkerConfig, anrOptions);
      }
    },

    /**
     * Stops the ANR worker if isBlobOrFileLikeObject is running
     */
    stopWorker: function () {
      if (anrWorkerPromise) {
        anrWorkerPromise.then((stopFunction) => {
          // Call the stop function returned by the worker, then clear the promise
          stopFunction();
          anrWorkerPromise = undefined;
        });
      }
    },

    /**
     * Sets up the ANR worker configuration and schedules the worker to start
     * @param {any} workerConfig - The configuration or subscription for the worker
     */
    setup: function (workerConfig) {
      anrWorkerConfig = workerConfig;
      // Schedule the worker to start on the next event loop tick
      setImmediate(() => this.startWorker());
    }
  };
}

module.exports = initializeAnrDetectionIntegration;
