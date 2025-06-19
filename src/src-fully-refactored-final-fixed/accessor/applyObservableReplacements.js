/**
 * Applies a series of replacements to an observable configuration string.
 * Each replacement consists of a pattern and a function. The function is bound to the original observable.
 * The replacements are applied in sequence using String.replace.
 *
 * @param {string} sourceObservable - The observable configuration string to process.
 * @returns {string} The resulting string after all replacements have been applied.
 */
function applyObservableReplacements(sourceObservable) {
  // Om9 is assumed to be an array of [pattern, replacementFunction] pairs
  // For each [pattern, replacementFunction], replace pattern in the config string
  // with the result of calling replacementFunction bound to the sourceObservable
  return Om9.reduce((config, [pattern, replacementFunction]) => {
    // Bind the replacement function to the source observable
    const boundReplacementFunction = replacementFunction.bind(sourceObservable);
    // Replace pattern in the config string with the bound function
    return config.replace(pattern, boundReplacementFunction);
  }, sourceObservable);
}

module.exports = applyObservableReplacements;