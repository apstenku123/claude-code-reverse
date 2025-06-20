/**
 * Initializes pointer event properties on the current object instance.
 *
 * This function is intended to be used as a constructor or initialization helper for objects
 * that represent pointer events. It sets default values for common pointer event properties
 * such as screen coordinates, client coordinates, modifier keys, button states, and related targets.
 *
 * @constructor
 * @returns {void} Does not return a value; initializes properties on 'this'.
 */
function initializePointerEventProperties() {
  // Call the parent constructor to ensure proper inheritance
  g$2.call(this);

  // Initialize pointer coordinates to 0
  this.screenX = 0;
  this.screenY = 0;
  this.clientX = 0;
  this.clientY = 0;

  // Initialize modifier keys to false (not pressed)
  this.ctrlKey = false;
  this.altKey = false;
  this.shiftKey = false;
  this.metaKey = false;

  // Initialize mouse button and buttons state
  this.button = 0;      // Typically 0 = main button (usually left)
  this.buttons = 1;     // Typically 1 = main button pressed

  // Initialize related target to null (no related element)
  this.relatedTarget = null;
}

module.exports = initializePointerEventProperties;