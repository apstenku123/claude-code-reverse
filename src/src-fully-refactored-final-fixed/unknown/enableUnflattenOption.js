/**
 * Enables the 'unflatten' option on the current instance'createInteractionAccessor options object.
 * This is typically used in configuration objects to indicate that nested properties
 * should not be flattened into a single level.
 *
 * @returns {this} Returns the current instance to allow method chaining.
 */
function enableUnflattenOption() {
  // Set the 'unflatten' property to true on the options object
  this.options.unflatten = true;
  // Return the current instance for chaining
  return this;
}

module.exports = enableUnflattenOption;