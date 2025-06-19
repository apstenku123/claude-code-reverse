/**
 * Creates progress handler functions for tracking and reporting progress events.
 *
 * @param {number|null} totalValue - The total value representing the complete progress (e.g., total bytes to load). If null, progress is not computable.
 * @param {Array<Function>} progressHandlers - An array where:
 *   - progressHandlers[0] is a function to handle progress events.
 *   - progressHandlers[1] is an additional handler or value to be returned as-is.
 * @returns {Array<Function>} An array containing:
 *   - a function that takes the loaded value and calls the progress handler with an object containing progress details.
 *   - The second element from the input progressHandlers array.
 */
const createProgressHandlers = (totalValue, progressHandlers) => {
  // Determine if the total progress is computable (i.e., totalValue is not null)
  const isLengthComputable = totalValue != null;

  /**
   * Handler function for progress events.
   * @param {number} loadedValue - The current loaded value (e.g., bytes loaded).
   * @returns {*} The result of calling the progress handler.
   */
  const handleProgress = (loadedValue) => {
    return progressHandlers[0]({
      lengthComputable: isLengthComputable,
      total: totalValue,
      loaded: loadedValue
    });
  };

  // Return the handler and the second element from progressHandlers
  return [handleProgress, progressHandlers[1]];
};

module.exports = createProgressHandlers;
