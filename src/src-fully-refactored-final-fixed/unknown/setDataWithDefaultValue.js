/**
 * Sets a default value for the given key in the internal data map and returns the current instance for chaining.
 *
 * @param {any} key - The key to set in the internal data map.
 * @returns {this} The current instance, allowing for method chaining.
 */
function setDataWithDefaultValue(key) {
  // Set the default value (gv2) for the provided key in the internal __data__ map
  this.__data__.set(key, gv2);
  // Return the current instance to allow chaining
  return this;
}

module.exports = setDataWithDefaultValue;