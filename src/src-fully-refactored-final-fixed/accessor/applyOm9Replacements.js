/**
 * Applies a series of replacements to the given source observable string using the Om9 mapping.
 * Each entry in Om9 is a [pattern, replacerFunction] pair. The replacerFunction is bound to the sourceObservable.
 *
 * @param {string} sourceObservable - The original observable string to process.
 * @returns {string} The observable string after all Om9 replacements have been applied.
 */
const applyOm9Replacements = (sourceObservable) => {
  return Om9.reduce(
    (currentObservable, [pattern, replacerFunction]) => {
      // Bind the replacer function to the sourceObservable context
      const boundReplacer = replacerFunction.bind(sourceObservable);
      // Replace occurrences of pattern in the currentObservable string
      return currentObservable.replace(pattern, boundReplacer);
    },
    sourceObservable
  );
};

module.exports = applyOm9Replacements;