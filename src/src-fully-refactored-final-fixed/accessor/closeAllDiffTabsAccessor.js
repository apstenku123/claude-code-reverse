/**
 * Closes all diff tabs by invoking the external mN function with the appropriate parameters.
 *
 * @async
 * @function closeAllDiffTabsAccessor
 * @param {any} sourceObservable - The observable or context to be passed to the mN function.
 * @returns {Promise<void>} Resolves when all diff tabs have been closed. Errors are silently ignored.
 */
async function closeAllDiffTabsAccessor(sourceObservable) {
  try {
    // Attempt to close all diff tabs using the external mN function
    await mN("closeAllDiffTabs", {}, sourceObservable, false);
  } catch (error) {
    // Silently ignore any errors that occur during the operation
  }
}

module.exports = closeAllDiffTabsAccessor;