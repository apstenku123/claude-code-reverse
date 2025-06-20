/**
 * @description
 * Initializes a pointer event object with default properties.
 * This function is intended to be used as a constructor or within a constructor context.
 * It sets up properties such as screen and client coordinates, modifier keys, button states, and related target.
 *
 * @constructor
 * @returns {void}
 */
function PointerEventInitializer() {
  // Call the parent constructor (assumed to be a base event class)
  g$2.call(this);

  // Initialize screen and client coordinates to 0
  this.screenX = 0;
  this.screenY = 0;
  this.clientX = 0;
  this.clientY = 0;

  // Initialize modifier keys to false
  this.ctrlKey = false;
  this.altKey = false;
  this.shiftKey = false;
  this.metaKey = false;

  // Initialize mouse button and buttons state
  this.button = 0;      // Typically 0 = main button (usually left)
  this.buttons = 1;     // Typically 1 = main button pressed

  // Initialize related target to null (no related element by default)
  this.relatedTarget = null;
}

module.exports = PointerEventInitializer;