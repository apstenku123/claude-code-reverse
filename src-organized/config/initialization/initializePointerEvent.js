/**
 * Initializes a pointer event object with default values.
 *
 * This function acts as a constructor for a pointer event, setting default values
 * for all relevant pointer event properties such as screen coordinates, client coordinates,
 * modifier keys, mouse button states, and related target. It also ensures that the base
 * event constructor (g$2) is called with the current context.
 *
 * @constructor
 * @returns {void} Does not return a value; initializes properties on 'this'.
 */
function initializePointerEvent() {
  // Call the base event constructor with the current context
  g$2.call(this);

  // Initialize pointer coordinates to 0
  this.screenX = 0;
  this.screenY = 0;
  this.clientX = 0;
  this.clientY = 0;

  // Initialize modifier keys to false
  this.ctrlKey = false;
  this.altKey = false;
  this.shiftKey = false;
  this.metaKey = false;

  // Initialize mouse button states
  this.button = 0;      // Typically 0 = main button (usually left)
  this.buttons = 1;     // 1 means primary button pressed

  // Initialize related target to null
  this.relatedTarget = null;
}

module.exports = initializePointerEvent;