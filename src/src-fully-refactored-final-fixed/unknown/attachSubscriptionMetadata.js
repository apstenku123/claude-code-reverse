/**
 * Attaches non-enumerable metadata properties to a given observable object.
 *
 * This function adds two non-enumerable properties to the provided observable:
 * one for the subscription object and one for the configuration object. This is
 * useful for associating internal metadata with observables without exposing them
 * during enumeration (e.g., in for...in loops or Object.keys).
 *
 * @param {Object} observable - The observable object to which metadata will be attached.
 * @param {Object} config - The configuration object to associate with the observable.
 * @param {Object} subscription - The subscription object to associate with the observable.
 * @returns {void}
 */
function attachSubscriptionMetadata(observable, config, subscription) {
  // Only attach metadata if the observable object exists
  if (observable) {
    // Attach the subscription object as a non-enumerable property
    Cc.addNonEnumerableProperty(observable, qBA, subscription);
    // Attach the configuration object as a non-enumerable property
    Cc.addNonEnumerableProperty(observable, $BA, config);
  }
}

module.exports = attachSubscriptionMetadata;