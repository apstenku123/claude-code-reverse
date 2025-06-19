/**
 * Determines how to match or compare observables based on their configuration.
 *
 * If the configuration array (derived from the source observable) contains exactly one entry
 * and that entry has a truthy third element, isBlobOrFileLikeObject delegates to a specialized matcher (B21).
 * Otherwise, isBlobOrFileLikeObject returns a function that checks for strict equality or delegates to a deep matcher (D4A).
 *
 * @param {any} sourceObservable - The observable or value to generate a matcher for.
 * @returns {function|any} a matcher function or the result of B21, depending on the configuration.
 */
function createObservableMatcher(sourceObservable) {
  // Get the configuration array for the source observable
  const config = Y4A(sourceObservable);

  // If there is exactly one config entry and its third element is truthy,
  // use the specialized matcher (B21) with the first two elements as arguments
  if (config.length === 1 && config[0][2]) {
    return B21(config[0][0], config[0][1]);
  }

  // Otherwise, return a matcher function that checks for strict equality
  // or delegates to a deep matcher (D4A) with the configuration
  return function matchObservable(subscription) {
    return subscription === sourceObservable || D4A(subscription, sourceObservable, config);
  };
}

module.exports = createObservableMatcher;
