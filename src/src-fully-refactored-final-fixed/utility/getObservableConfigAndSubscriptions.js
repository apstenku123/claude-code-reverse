/**
 * Retrieves the configuration for a given observable and flattens its output subscriptions.
 *
 * @param {Object} sourceObservable - The observable object containing configuration and outputs.
 * @returns {Array} An array where the first element is the observable'createInteractionAccessor configuration, followed by any flattened output subscriptions.
 */
function getObservableConfigAndSubscriptions(sourceObservable) {
  // Get the configuration for the observable using createCellTextObject
  const config = createCellTextObject(sourceObservable);

  // If outputs exist, flatten them using extractTextAndImageEntries; otherwise, use an empty array
  const subscriptions = sourceObservable.outputs?.flatMap(extractTextAndImageEntries) ?? [];

  // Return an array with the config as the first element, followed by all subscriptions
  return [config, ...subscriptions];
}

module.exports = getObservableConfigAndSubscriptions;