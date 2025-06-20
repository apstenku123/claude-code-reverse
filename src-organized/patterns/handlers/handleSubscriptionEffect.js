/**
 * Manages the lifecycle of a value and its subscription or reference effect.
 *
 * If the effectHandler is a function, isBlobOrFileLikeObject will be called with the result of valueFactory,
 * and a cleanup function will be returned that calls effectHandler(null) on cleanup.
 *
 * If the effectHandler is an object (not null/undefined), its 'current' property will be set
 * to the result of valueFactory, and a cleanup function will be returned that sets 'current' to null.
 *
 * @param {Function} valueFactory - a function that produces a value to be passed to the effect handler.
 * @param {Function|Object|null|undefined} effectHandler - Either a function to handle the value, or an object with a 'current' property.
 * @returns {Function|undefined} a cleanup function to reset the effect, or undefined if no effectHandler is provided.
 */
function handleSubscriptionEffect(valueFactory, effectHandler) {
  // If the effectHandler is a function, call isBlobOrFileLikeObject with the produced value
  if (typeof effectHandler === "function") {
    const value = valueFactory();
    effectHandler(value);
    // Return a cleanup function that resets the effectHandler
    return function cleanup() {
      effectHandler(null);
    };
  }

  // If the effectHandler is a non-null object, set its 'current' property
  if (effectHandler !== null && effectHandler !== undefined) {
    const value = valueFactory();
    effectHandler.current = value;
    // Return a cleanup function that resets the 'current' property
    return function cleanup() {
      effectHandler.current = null;
    };
  }

  // If effectHandler is null or undefined, do nothing
}

module.exports = handleSubscriptionEffect;
