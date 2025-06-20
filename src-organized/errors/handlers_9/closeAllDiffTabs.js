/**
 * Closes all tabs that are marked as 'diff' tabs by invoking the external mN function.
 *
 * @async
 * @function closeAllDiffTabs
 * @param {object} sourceObservable - The observable or context required by the mN function.
 * @returns {Promise<void>} Resolves when the close operation is complete. Errors are silently ignored.
 */
async function closeAllDiffTabs(sourceObservable) {
  try {
    // Attempt to close all diff tabs using the external mN function.
    // The parameters are: action name, options object, source observable, and a boolean flag.
    await mN("closeAllDiffTabs", {}, sourceObservable, false);
  } catch (error) {
    // Silently ignore any errors that occur during the close operation.
  }
}

module.exports = closeAllDiffTabs;