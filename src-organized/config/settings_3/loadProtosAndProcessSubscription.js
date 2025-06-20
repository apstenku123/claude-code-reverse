/**
 * Loads protocol definitions with the given options and processes the resulting subscription.
 *
 * @param {Observable} sourceObservable - The observable source to load protocol definitions from.
 * @param {Object} config - Configuration options for loading protocol definitions and processing the subscription.
 * @returns {Promise<any>} a promise that resolves with the result of processing the loaded subscription.
 */
function loadProtosAndProcessSubscription(sourceObservable, config) {
  // Load protocol definitions using the provided observable and configuration options
  return Gh1.loadProtosWithOptions(sourceObservable, config)
    .then(subscription => {
      // Process the loaded subscription with the same configuration
      return gZ1(subscription, config);
    });
}

module.exports = loadProtosAndProcessSubscription;