/**
 * UtilityViewInitializer is a constructor function that initializes a utility view object.
 * It calls the parent constructor (createRangeIterator$2) with the current context and sets up default properties.
 *
 * @constructor
 */
function UtilityViewInitializer() {
  // Call the parent constructor with the current context
  createRangeIterator$2.call(this);
  // Initialize the view property to null
  this.view = null;
  // Initialize the detail property to 0
  this.detail = 0;
}

module.exports = UtilityViewInitializer;