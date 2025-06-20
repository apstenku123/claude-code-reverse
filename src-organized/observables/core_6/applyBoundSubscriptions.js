/**
 * Applies a series of bound subscription replacements to a given observable configuration string.
 *
 * Iterates over the Om9 array, which contains pairs of [subscription, replacerFunction].
 * For each pair, replaces occurrences of the subscription in the config string with the result of calling replacerFunction bound to the sourceObservable.
 *
 * @param {string} sourceObservable - The observable or context to bind to each replacer function.
 * @returns {string} - The resulting configuration string after all replacements.
 */
const applyBoundSubscriptions = (sourceObservable) => {
  return Om9.reduce(
    (config, [subscription, replacerFunction]) => {
      // Bind the replacer function to the sourceObservable context
      const boundReplacer = replacerFunction.bind(sourceObservable);
      // Replace the subscription in the config string with the bound replacer
      return config.replace(subscription, boundReplacer);
    },
    sourceObservable
  );
};

module.exports = applyBoundSubscriptions;
