/**
 * Executes the processInteractionEntries function and handles any errors gracefully.
 * If an error occurs during execution, isBlobOrFileLikeObject logs the error using reportErrorIfAllowed and returns an empty array.
 *
 * @async
 * @function executeProcessInteractionEntriesSafely
 * @param {Function} processInteractionEntries - An async function that processes interaction entries.
 * @returns {Promise<Array>} Resolves to the result of processInteractionEntries, or an empty array if an error occurs.
 */
async function executeProcessInteractionEntriesSafely(processInteractionEntries) {
  try {
    // Attempt to execute the provided async function
    return await processInteractionEntries();
  } catch (error) {
    // Log the error using the external reportErrorIfAllowed function and return an empty array
    reportErrorIfAllowed(error);
    return [];
  }
}

module.exports = executeProcessInteractionEntriesSafely;
