/**
 * Executes the processAndCleanLogDirectories and cleanupOldJsonlMessageDirectories cleanup tasks asynchronously using setImmediate.
 * This ensures that the cleanup operations do not block the current event loop tick.
 * The .unref() call allows the Node.js process to exit if this is the only operation left.
 *
 * @returns {void} This function does not return a value.
 */
function runDeferredCleanupTasks() {
  // Schedule cleanup tasks to run asynchronously, without keeping the event loop alive
  setImmediate(() => {
    processAndCleanLogDirectories(); // Perform first cleanup task
    cleanupOldJsonlMessageDirectories(); // Perform second cleanup task
  }).unref();
}

module.exports = runDeferredCleanupTasks;