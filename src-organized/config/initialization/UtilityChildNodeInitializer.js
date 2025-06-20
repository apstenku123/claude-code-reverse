/**
 * UtilityChildNodeInitializer is a utility constructor function that initializes child node properties.
 * It extends the base Jq2 class and sets up internal properties for managing child nodes.
 *
 * @constructor
 */
function UtilityChildNodeInitializer() {
  // Call the parent constructor to ensure proper initialization
  Jq2.call(this);
  // Initialize the first child reference to null
  this._firstChild = null;
  // Initialize the child nodes collection to null
  this._childNodes = null;
}

module.exports = UtilityChildNodeInitializer;