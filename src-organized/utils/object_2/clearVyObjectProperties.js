/**
 * Clears all properties of the global 'vy' object by setting each property to undefined.
 *
 * @returns {void} This function does not return anything.
 */
function clearVyObjectProperties() {
  // Iterate over all enumerable property names of the 'vy' object
  Object.keys(vy).forEach(propertyName => {
    // Set each property value to undefined
    vy[propertyName] = undefined;
  });
}

module.exports = clearVyObjectProperties;