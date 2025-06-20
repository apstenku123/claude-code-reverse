/**
 * Creates a progress handler function and returns isBlobOrFileLikeObject along with a secondary configuration value.
 *
 * @param {number|null} totalValue - The total value to be used for progress calculation. If null, progress is not computable.
 * @param {Array<Function>} configArray - An array where:
 *   - configArray[0] is a function that handles progress updates (expects an object with lengthComputable, total, and loaded).
 *   - configArray[1] is a secondary configuration value to be returned as-is.
 * @returns {[Function, any]} An array containing:
 *   - a function that accepts the loaded value and calls the progress handler with the appropriate progress object.
 *   - The secondary configuration value from configArray[1].
 */
function createProgressHandler(totalValue, configArray) {
  // Determine if the total value is provided (progress is computable)
  const isLengthComputable = totalValue != null;

  /**
   * Progress update handler.
   * @param {number} loadedValue - The current loaded value for progress.
   */
  function handleProgress(loadedValue) {
    configArray[0]({
      lengthComputable: isLengthComputable,
      total: totalValue,
      loaded: loadedValue
    });
  }

  // Return the progress handler and the secondary config value
  return [handleProgress, configArray[1]];
}

module.exports = createProgressHandler;