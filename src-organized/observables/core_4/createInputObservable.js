/**
 * Creates an input observable by delegating to the handleInteractionAndTransaction function with specific parameters.
 *
 * @param {Observable} sourceObservable - The source observable to be transformed.
 * @returns {any} The result of the handleInteractionAndTransaction function, typically an observable or a subscription.
 */
function createInputObservable(sourceObservable) {
  // Delegates to handleInteractionAndTransaction with 'inp' type, the source observable, and additional configuration/constants
  return handleInteractionAndTransaction("inp", sourceObservable, D89, KIA);
}

module.exports = createInputObservable;