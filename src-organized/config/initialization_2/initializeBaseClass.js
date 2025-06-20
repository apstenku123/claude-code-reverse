/**
 * Calls the TL0 constructor with the current context.
 * This function is intended to be used as a subclass constructor,
 * ensuring that the base class TL0 is properly initialized.
 *
 * @constructor
 */
function initializeBaseClass() {
  // Call the TL0 constructor with the current instance as context
  TL0.call(this);
}

module.exports = initializeBaseClass;