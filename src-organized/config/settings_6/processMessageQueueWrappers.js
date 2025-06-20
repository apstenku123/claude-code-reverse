/**
 * Processes a set of configuration entries by applying the wrapMethodWithInterceptor function to each entry.
 *
 * @param {Object} sourceObject - The source object or context to be passed to wrapMethodWithInterceptor for each entry.
 * @param {Object} configEntries - An object containing configuration entries to process.
 * @returns {Object} An object mapping each key from configEntries to the result of wrapMethodWithInterceptor for that entry.
 */
function processMessageQueueWrappers(sourceObject, configEntries) {
  const processedEntries = {};
  // Iterate over each key in the configuration entries
  for (const entryKey in configEntries) {
    if (Object.prototype.hasOwnProperty.call(configEntries, entryKey)) {
      // Apply wrapMethodWithInterceptor to each entry and store the result
      processedEntries[entryKey] = wrapMethodWithInterceptor(sourceObject, entryKey, configEntries[entryKey]);
    }
  }
  return processedEntries;
}

module.exports = processMessageQueueWrappers;