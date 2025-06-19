/**
 * Combines the configuration derived from the source observable with any output subscriptions.
 *
 * This utility function takes a source observable, processes isBlobOrFileLikeObject to extract configuration data,
 * and then, if present, flattens and processes its outputs into subscriptions. The result is an array
 * where the first element is the configuration, followed by any output subscriptions.
 *
 * @param {Object} sourceObservable - The observable object containing configuration and optional outputs.
 * @returns {Array} An array containing the configuration object and any output subscriptions.
 */
function combineConfigWithOutputSubscriptions(sourceObservable) {
  // Process the source observable to extract configuration
  const config = createCellTextObject(sourceObservable);

  // If outputs exist, flatten and process them into subscriptions; otherwise, use an empty array
  const outputSubscriptions = sourceObservable.outputs?.flatMap(extractTextAndImageEntries) ?? [];

  // Return an array with the config as the first element, followed by all output subscriptions
  return [config, ...outputSubscriptions];
}

module.exports = combineConfigWithOutputSubscriptions;