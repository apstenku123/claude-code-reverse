/**
 * Initializes and merges global, isolation, and current scope data into a single scope object.
 *
 * This function retrieves the global scope data, merges in the isolation and current scope data,
 * then resets the attachments and eventProcessors arrays to empty. The resulting scope data object
 * is returned for further use.
 *
 * @returns {Object} The initialized and merged scope data object with cleared attachments and eventProcessors.
 */
function initializeGlobalScopeData() {
  // Retrieve the global scope data object
  const globalScopeData = CU.getGlobalScope().getScopeData();

  // Merge isolation scope data into the global scope data
  CU.mergeScopeData(globalScopeData, CU.getIsolationScope().getScopeData());

  // Merge current scope data into the global scope data
  CU.mergeScopeData(globalScopeData, CU.getCurrentScope().getScopeData());

  // Reset attachments and eventProcessors arrays
  globalScopeData.attachments = [];
  globalScopeData.eventProcessors = [];

  // Return the fully initialized and merged scope data object
  return globalScopeData;
}

module.exports = initializeGlobalScopeData;