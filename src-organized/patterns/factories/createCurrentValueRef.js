/**
 * Creates a reference object containing the provided current value.
 *
 * @param {any} currentValue - The value to be stored as the current reference.
 * @returns {{ current: any }} An object with a single property 'current' holding the provided value.
 */
function createCurrentValueRef(currentValue) {
  // Return an object with the current value assigned to the 'current' property
  return {
    current: currentValue
  };
}

module.exports = createCurrentValueRef;