/**
 * Updates an observable or its subscription list based on the provided configuration.
 *
 * If config is 0, adds the subscription value to the first element of the observable array.
 * If config is 1 or 2, pushes the subscription into the corresponding sub-array of the observable.
 * Calls the external getArrayOrBufferLength function with the updated value and returns its result.
 *
 * @param {Array} sourceObservable - The observable array to update. The structure is expected to be:
 *   [number, Array, Array], where index 0 is a number and indices 1 and 2 are arrays.
 * @param {number} config - Determines which part of the observable to update:
 *   0: increment the first element by subscription.
 *   1 or 2: push subscription into the corresponding sub-array.
 * @param {*} subscription - The value to add or push, depending on config.
 * @returns {*} The result of calling getArrayOrBufferLength with the updated value.
 */
function updateObservableWithSubscription(sourceObservable, config, subscription) {
  switch (config) {
    case 0:
      // Increment the first element by the subscription value
      sourceObservable[0] += subscription;
      return getArrayOrBufferLength(sourceObservable[0]);
    case 1:
    case 2:
      // Push the subscription into the corresponding sub-array (index 1 or 2)
      sourceObservable[config].push(subscription);
      return getArrayOrBufferLength(sourceObservable[config]);
    default:
      // Optionally handle unexpected config values
      throw new Error(`Invalid config value: ${config}`);
  }
}

module.exports = updateObservableWithSubscription;