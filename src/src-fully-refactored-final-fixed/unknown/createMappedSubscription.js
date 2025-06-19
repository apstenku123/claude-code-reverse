/**
 * Applies a mapping function to each item emitted by the source observable and collects the results in a subscription object.
 *
 * @param {Observable} sourceObservable - The source observable to iterate over.
 * @param {Function} mappingFunction - The function to apply to each item. Will be processed by Sq before use.
 * @returns {Object} An object representing the subscription, with mapped results keyed by their group.
 */
function createMappedSubscription(sourceObservable, mappingFunction) {
  // Initialize the subscription object to collect results
  const subscription = {};
  // Process the mapping function using Sq with a fixed argument (3)
  const processedMappingFunction = Sq(mappingFunction, 3);
  // Iterate over the source observable using G21
  G21(sourceObservable, function (item, group, index) {
    // Apply the processed mapping function and store the result in the subscription object
    $q(subscription, group, processedMappingFunction(item, group, index));
  });
  // Return the populated subscription object
  return subscription;
}

module.exports = createMappedSubscription;