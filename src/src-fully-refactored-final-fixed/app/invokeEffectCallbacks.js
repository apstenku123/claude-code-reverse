/**
 * Invokes all effect callbacks stored in the 'effects' property of the given effectContainer.
 * After invocation, clears the 'effects' property to prevent duplicate calls.
 * If a callback is not a function, throws an error using the provided errorFormatter.
 *
 * @param {Object} effectContainer - Object containing an 'effects' array property.
 * @param {Object} context - The context object to be used as 'this' when invoking callbacks.
 * @param {Function} errorFormatter - Function to format error messages (should accept error code and value).
 * @returns {void}
 */
function invokeEffectCallbacks(effectContainer, context, errorFormatter) {
  // Extract and clear the effects array from the container
  const effects = effectContainer.effects;
  effectContainer.effects = null;

  // If there are effects to process
  if (effects !== null) {
    for (let i = 0; i < effects.length; i++) {
      const effect = effects[i];
      const callback = effect.callback;
      if (callback !== null) {
        // Clear the callback to prevent re-invocation
        effect.callback = null;
        // Ensure the callback is a function
        if (typeof callback !== "function") {
          throw Error(errorFormatter(191, callback));
        }
        // Invoke the callback with the provided context
        callback.call(context);
      }
    }
  }
}

module.exports = invokeEffectCallbacks;