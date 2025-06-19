/**
 * ChildNodeContainer is a utility constructor function that initializes an object
 * to manage child nodes in a tree-like structure. It extends the base NodeContainer
 * by calling its constructor and sets up properties to track the first child and
 * the list of all child nodes.
 *
 * @constructor
 */
function ChildNodeContainer() {
  // Call the parent constructor to initialize base properties
  NodeContainer.call(this);

  // Initialize the first child reference to null
  this.firstChild = null;

  // Initialize the child nodes collection to null
  this.childNodes = null;
}

module.exports = ChildNodeContainer;