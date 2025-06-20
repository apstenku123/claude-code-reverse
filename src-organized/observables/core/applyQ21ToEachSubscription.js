/**
 * Applies the Q21 function to each subscription in the given source observable using the provided configuration.
 *
 * @param {Observable} sourceObservable - The observable to operate on.
 * @param {Object} config - Configuration object to be passed to D21.
 * @returns {any} The result of applying D21 with Q21 as the callback for each subscription.
 */
function applyQ21ToEachSubscription(sourceObservable, config) {
  return D21(sourceObservable, config, function (subscription, index) {
    // For each subscription, apply Q21 with the source observable and the current index
    return Q21(sourceObservable, index);
  });
}

module.exports = applyQ21ToEachSubscription;