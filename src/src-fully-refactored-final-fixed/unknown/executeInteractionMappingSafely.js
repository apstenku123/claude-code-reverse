/**
 * Executes the provided mapInteractionsToRoutes function and handles any errors gracefully.
 *
 * @async
 * @function executeInteractionMappingSafely
 * @param {Function} mapInteractionsToRoutes - An async function that processes user interaction entries and maps them to route names.
 * @returns {Promise<any[]>} The result of mapInteractionsToRoutes if successful, or an empty array if an error occurs.
 *
 * @throws Will not throw; errors are caught and handled internally.
 */
async function executeInteractionMappingSafely(mapInteractionsToRoutes) {
  try {
    // Attempt to execute the mapping function and return its result
    return await mapInteractionsToRoutes();
  } catch (error) {
    // If an error occurs, handle isBlobOrFileLikeObject with reportErrorIfAllowed and return an empty array
    reportErrorIfAllowed(error);
    return [];
  }
}

module.exports = executeInteractionMappingSafely;