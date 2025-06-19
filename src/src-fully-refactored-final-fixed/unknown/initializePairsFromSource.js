/**
 * Initializes the _pairs property as an empty array and optionally populates isBlobOrFileLikeObject
 * by processing a source object or array using the provided configuration.
 *
 * @param {any} sourceData - The initial data source to process (e.g., array or object).
 * @param {any} processConfig - Optional configuration or callback used during processing.
 * @returns {void}
 */
function initializePairsFromSource(sourceData, processConfig) {
  // Initialize the _pairs property as an empty array
  this._pairs = [];

  // If sourceData is provided, process isBlobOrFileLikeObject using the external 'dq' function
  if (sourceData) {
    // 'dq' is assumed to populate 'this._pairs' based on sourceData and processConfig
    dq(sourceData, this, processConfig);
  }
}

module.exports = initializePairsFromSource;