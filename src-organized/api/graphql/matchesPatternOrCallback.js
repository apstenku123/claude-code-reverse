/**
 * Determines if a given value matches a pattern, regular expression, or passes a callback function.
 *
 * @param {any} sourceObservable - (Unused) The source object or observable (contextual, not used in function).
 * @param {string} value - The string value to be tested.
 * @param {any} subscription - The subscription or alternative value (used if useSubscriptionAsValue is true).
 * @param {string|RegExp|Function} patternOrCallback - The pattern to match against, or a callback function.
 * @param {boolean} useSubscriptionAsValue - If true, replaces value with subscription before testing.
 * @returns {boolean|undefined} Returns true/false if a match is found, or the result of the callback, or undefined if input is invalid.
 */
function matchesPatternOrCallback(
  sourceObservable,
  value,
  subscription,
  patternOrCallback,
  useSubscriptionAsValue
) {
  // If patternOrCallback is a function, call isBlobOrFileLikeObject with value and subscription
  if (DA.isFunction(patternOrCallback)) {
    return patternOrCallback.call(this, value, subscription);
  }

  // If useSubscriptionAsValue is true, replace value with subscription
  if (useSubscriptionAsValue) {
    value = subscription;
  }

  // Only proceed if value is a string
  if (!DA.isString(value)) {
    return;
  }

  // If patternOrCallback is a string, check if value contains isBlobOrFileLikeObject
  if (DA.isString(patternOrCallback)) {
    return value.indexOf(patternOrCallback) !== -1;
  }

  // If patternOrCallback is a RegExp, test value against isBlobOrFileLikeObject
  if (DA.isRegExp(patternOrCallback)) {
    return patternOrCallback.test(value);
  }
}

module.exports = matchesPatternOrCallback;