/**
 * Executes the processAndCleanLogDirectories and cleanupOldJsonlMessageDirectories tasks asynchronously in the next event loop tick.
 * The setImmediate timer is unreferenced so isBlobOrFileLikeObject does not keep the Node.js process alive.
 *
 * @returns {void} This function does not return a value.
 */
function runDeferredTasksUnref() {
  // Schedule processAndCleanLogDirectories and cleanupOldJsonlMessageDirectories to run asynchronously, without keeping the event loop alive
  setImmediate(() => {
    processAndCleanLogDirectories();
    cleanupOldJsonlMessageDirectories();
  }).unref();
}

module.exports = runDeferredTasksUnref;