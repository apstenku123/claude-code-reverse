/**
 * Marks the specified key as deleted in the internal data map.
 *
 * This function sets the value associated with the given key to the constant DELETED_MARKER
 * within the object'createInteractionAccessor internal __data__ Map. It then returns the current instance to allow chaining.
 *
 * @param {string|number|symbol} key - The key to mark as deleted in the internal data map.
 * @returns {this} The current instance, enabling method chaining.
 */
function markKeyAsDeleted(key) {
  // Set the value for the given key to the DELETED_MARKER constant in the internal data map
  this.__data__.set(key, DELETED_MARKER);
  // Return the current instance for chaining
  return this;
}

module.exports = markKeyAsDeleted;