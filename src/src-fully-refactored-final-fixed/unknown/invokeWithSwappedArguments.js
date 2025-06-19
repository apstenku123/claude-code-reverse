/**
 * Invokes the bM6 function with the first two arguments swapped.
 *
 * @param {Object} config - Configuration object to be passed as the first argument to bM6.
 * @param {Object} sourceObservable - The observable or source object to be passed as the second argument to bM6.
 * @param {Object} subscription - Subscription or additional parameter to be passed as the third argument to bM6.
 * @returns {any} The result of calling bM6 with the arguments in swapped order.
 */
const invokeWithSwappedArguments = (config, sourceObservable, subscription) => {
  // Call bM6 with config as the first argument, sourceObservable as the second, and subscription as the third
  return bM6(config, sourceObservable, subscription);
};

module.exports = invokeWithSwappedArguments;
