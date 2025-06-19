/**
 * UtilityViewDetailInitializer initializes the view and detail properties for a utility object.
 * It also ensures that the parent constructor (createRangeIterator$2) is called with the correct context.
 *
 * @constructor
 */
function UtilityViewDetailInitializer() {
  // Call the parent constructor with the current context
  createRangeIterator$2.call(this);

  /**
   * Represents the view associated with this utility instance.
   * @type {null}
   */
  this.view = null;

  /**
   * Stores additional detail information for this utility instance.
   * @type {number}
   */
  this.detail = 0;
}

module.exports = UtilityViewDetailInitializer;