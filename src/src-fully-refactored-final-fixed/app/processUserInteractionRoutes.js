/**
 * Processes user interaction entries by mapping them to routes and starting UI action transactions.
 * For each mapped route, attempts to start a UI action click transaction and, if successful, records the activity.
 * Any errors encountered during the activity recording are caught and logged.
 *
 * @async
 * @returns {Promise<void>} Resolves when all user interaction routes have been processed.
 */
async function processUserInteractionRoutes() {
  // Retrieve all mapped user interaction routes
  const mappedRoutes = await mapInteractionsToRoutes();
  if (mappedRoutes.length === 0) return;

  for (const routeEntry of mappedRoutes) {
    // The last element in the route entry is assumed to be the route metadata (with uuid)
    const routeMetadata = routeEntry[routeEntry.length - 1];
    // Attempt to start a UI action click transaction for this route entry
    const uiActionTransaction = await startUiActionClickTransaction(routeEntry);
    try {
      // If a transaction was started, record the activity with the route'createInteractionAccessor uuid
      if (uiActionTransaction) {
        addActivityIfNotFinished(routeMetadata.uuid, uiActionTransaction);
      }
    } catch (error) {
      // Log any errors encountered during activity recording
      reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    }
  }
}

module.exports = processUserInteractionRoutes;