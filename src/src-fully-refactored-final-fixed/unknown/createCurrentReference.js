/**
 * Creates an object containing a single property 'current' set to the provided value.
 * This is commonly used to create a mutable reference object, similar to React'createInteractionAccessor useRef.
 *
 * @param {any} initialValue - The initial value to assign to the 'current' property.
 * @returns {{ current: any }} An object with a 'current' property set to the provided value.
 */
function createCurrentReference(initialValue) {
  // Return an object with a single mutable property 'current'
  return {
    current: initialValue
  };
}

module.exports = createCurrentReference;