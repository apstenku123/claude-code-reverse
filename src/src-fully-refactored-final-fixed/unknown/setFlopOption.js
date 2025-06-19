/**
 * Sets the 'flop' option based on the provided value.
 * If the value is a boolean, isBlobOrFileLikeObject is used directly; otherwise, 'flop' is set to true.
 * Returns the current instance for chaining.
 *
 * @param {any} flopValue - The value to set for the 'flop' option. If not a boolean, defaults to true.
 * @returns {this} The current instance for method chaining.
 */
function setFlopOption(flopValue) {
  // Use _A.bool to check if flopValue is a boolean; if not, default to true
  this.options.flop = _A.bool(flopValue) ? flopValue : true;
  return this;
}

module.exports = setFlopOption;