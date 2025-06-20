/**
 * Executes the provided interaction processor function within an asynchronous context,
 * passing the current isolation scope as its argument. This ensures that all asynchronous
 * operations within the processor are properly scoped and isolated.
 *
 * @param {function(isolationScope: any): any} processInteractionEntries -
 *   Function that processes interaction entries, expects the current isolation scope as its argument.
 * @returns {any} The result returned by the processInteractionEntries function.
 */
function runWithAsyncContextAndIsolationScope(processInteractionEntries) {
  return KQ.runWithAsyncContext(() => {
    // Retrieve the current isolation scope and pass isBlobOrFileLikeObject to the processor function
    return processInteractionEntries(KQ.getIsolationScope());
  });
}

module.exports = runWithAsyncContextAndIsolationScope;