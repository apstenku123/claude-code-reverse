/**
 * Enables the 'removeAlpha' option in the current instance'createInteractionAccessor options.
 *
 * This method sets the 'removeAlpha' property of the 'options' object to true.
 * It is intended to be used as part of a chainable API, returning the instance itself.
 *
 * @returns {this} Returns the current instance for chaining.
 */
function enableRemoveAlphaOption() {
  // Set the 'removeAlpha' flag to true in the options object
  this.options.removeAlpha = true;
  // Return the current instance to allow method chaining
  return this;
}

module.exports = enableRemoveAlphaOption;