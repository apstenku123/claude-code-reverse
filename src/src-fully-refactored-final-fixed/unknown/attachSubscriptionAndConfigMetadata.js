/**
 * Attaches non-enumerable metadata properties for subscription and configuration to a given observable object.
 *
 * @param {Object} sourceObservable - The observable object to which metadata will be attached.
 * @param {Object} config - The configuration object to be attached as metadata.
 * @param {Object} subscription - The subscription object to be attached as metadata.
 * @returns {void}
 *
 * This function uses Cc.addNonEnumerableProperty to attach two metadata properties (for subscription and config)
 * to the provided observable object. The properties are attached as non-enumerable, so they do not appear in
 * standard object enumeration (e.g., for...in loops or Object.keys()).
 */
function attachSubscriptionAndConfigMetadata(sourceObservable, config, subscription) {
  if (sourceObservable) {
    // Attach the subscription metadata as a non-enumerable property
    Cc.addNonEnumerableProperty(sourceObservable, qBA, subscription);
    // Attach the configuration metadata as a non-enumerable property
    Cc.addNonEnumerableProperty(sourceObservable, $BA, config);
  }
}

module.exports = attachSubscriptionAndConfigMetadata;