/**
 * Creates an effect object that, when triggered, sets a global value and invokes a callback with provided arguments.
 * The effect'createInteractionAccessor payload sets the element to null and assigns a callback that updates global state and triggers a side effect.
 *
 * @param {object} context - The context or owner object for the effect (typically a component instance).
 * @param {object} effectDescriptor - An object containing a 'value' property to be used in the callback.
 * @param {object} effect - The effect object to be modified and returned.
 * @returns {object} The modified effect object with updated tag, payload, and callback.
 */
function createNullElementCallbackEffect(context, effectDescriptor, effect) {
  // Clone or initialize the effect object with a default tag
  effect = createEventQueueNode(-1, effect);
  effect.tag = 3;
  effect.payload = {
    element: null
  };

  // Extract the value to be set globally when the callback is invoked
  const newValue = effectDescriptor.value;

  // Assign a callback that sets a global value and triggers a side effect
  effect.callback = function () {
    // Only update global state if not already set
    if (!getAllEnumerableKeysAndSymbols) {
      getAllEnumerableKeysAndSymbols = true;
      mergeObjectsWithDescriptors = newValue;
    }
    // Trigger the external effect with the provided context and descriptor
    eD(context, effectDescriptor);
  };

  return effect;
}

module.exports = createNullElementCallbackEffect;