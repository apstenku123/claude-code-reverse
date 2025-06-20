/**
 * Creates an object containing a single property 'current' referencing the provided value.
 * This is commonly used to create mutable references, similar to React'createInteractionAccessor useRef.
 *
 * @param {any} value - The value to be referenced by the 'current' property.
 * @returns {{ current: any }} An object with a 'current' property pointing to the provided value.
 */
function createCurrentValueReference(value) {
  // Return an object with a 'current' property referencing the input value
  return {
    current: value
  };
}

module.exports = createCurrentValueReference;