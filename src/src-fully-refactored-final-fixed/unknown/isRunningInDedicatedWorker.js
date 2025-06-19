/**
 * Checks if the current JavaScript context is a Dedicated Web Worker.
 *
 * This function determines whether the global 'self' object exists and is an instance
 * of DedicatedWorkerGlobalScope, which is true only inside a dedicated Web Worker.
 *
 * @returns {boolean} True if running inside a Dedicated Web Worker, false otherwise.
 */
function isRunningInDedicatedWorker() {
  // Check that 'self' is defined (not undefined)
  // and that 'DedicatedWorkerGlobalScope' is available in the environment
  // Then check if 'self' is an instance of DedicatedWorkerGlobalScope
  return (
    typeof self !== "undefined" &&
    typeof DedicatedWorkerGlobalScope !== "undefined" &&
    self instanceof DedicatedWorkerGlobalScope
  );
}

module.exports = isRunningInDedicatedWorker;