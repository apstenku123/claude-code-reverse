/**
 * Attaches non-enumerable properties for subscription and configuration to a source observable object.
 *
 * This function adds two non-enumerable properties to the given observable:
 *   - One for the subscription object
 *   - One for the configuration object
 *
 * @param {Object} sourceObservable - The observable object to which properties will be attached.
 * @param {Object} config - The configuration object to attach.
 * @param {Object} subscription - The subscription object to attach.
 * @returns {void}
 */
function attachSubscriptionAndConfigToObservable(sourceObservable, config, subscription) {
  if (sourceObservable) {
    // Attach the subscription as a non-enumerable property
    Cc.addNonEnumerableProperty(sourceObservable, qBA, subscription);
    // Attach the config as a non-enumerable property
    Cc.addNonEnumerableProperty(sourceObservable, $BA, config);
  }
}

module.exports = attachSubscriptionAndConfigToObservable;