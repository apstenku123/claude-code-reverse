/**
 * Handles a value-producing function and a handler, supporting both callback and ref object patterns.
 *
 * If the handler is a function, invokes the value producer, passes the result to the handler, and returns a cleanup function that calls the handler with null.
 * If the handler is a ref-like object (with a 'current' property), assigns the produced value to 'current', and returns a cleanup function that resets 'current' to null.
 *
 * @param {Function} valueProducer - a function that produces a value when called.
 * @param {Function|Object|null|undefined} handlerOrRef - Either a callback function to handle the produced value, or a ref-like object with a 'current' property.
 * @returns {Function|undefined} a cleanup function that resets the handler or ref, or undefined if handlerOrRef is null/undefined.
 */
function handleSubscriptionOrRefAssignment(valueProducer, handlerOrRef) {
  // If handlerOrRef is a function, treat as a callback pattern
  if (typeof handlerOrRef === "function") {
    const producedValue = valueProducer();
    handlerOrRef(producedValue);
    // Return cleanup function that calls handler with null
    return function cleanup() {
      handlerOrRef(null);
    };
  }

  // If handlerOrRef is a non-null/undefined object, treat as a ref pattern
  if (handlerOrRef !== null && handlerOrRef !== undefined) {
    const producedValue = valueProducer();
    handlerOrRef.current = producedValue;
    // Return cleanup function that resets ref'createInteractionAccessor current to null
    return function cleanup() {
      handlerOrRef.current = null;
    };
  }

  // If handlerOrRef is null or undefined, do nothing
}

module.exports = handleSubscriptionOrRefAssignment;
