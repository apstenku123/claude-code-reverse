/**
 * Applies a series of subscription replacements to a given observable configuration string.
 *
 * Each entry in the Om9 array consists of a [pattern, replacementFunction] pair. This function
 * iterates through each pair, replacing occurrences of the pattern in the configuration string
 * with the result of the replacement function, which is bound to the sourceObservable.
 *
 * @param {string} sourceObservable - The observable configuration string to process.
 * @returns {string} - The processed configuration string with all subscriptions applied.
 */
const applyObservableSubscriptions = (sourceObservable) => {
  return Om9.reduce(
    (config, [pattern, replacementFunction]) => {
      // Bind the replacement function to the sourceObservable and replace pattern in config
      return config.replace(pattern, replacementFunction.bind(sourceObservable));
    },
    sourceObservable
  );
};

module.exports = applyObservableSubscriptions;
