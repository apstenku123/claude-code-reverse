/**
 * Initializes the global scope data object by merging data from global, isolation, and current scopes.
 * Also resets the attachments and eventProcessors arrays on the resulting scope data object.
 *
 * @returns {Object} The fully merged and initialized global scope data object.
 */
function initializeAndMergeGlobalScopeData() {
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

module.exports = initializeAndMergeGlobalScopeData;