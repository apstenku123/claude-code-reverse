/**
 * UtilityChildNodeContainer is a utility class that extends the base Jq2 class.
 * It initializes properties for managing child nodes in a tree-like structure.
 *
 * @class UtilityChildNodeContainer
 * @extends Jq2
 */
function UtilityChildNodeContainer() {
  // Call the parent constructor to ensure proper initialization
  Jq2.call(this);

  /**
   * The first child node of this container.
   * @type {Object|null}
   */
  this.firstChildNode = null;

  /**
   * All child nodes of this container.
   * @type {Array|null}
   */
  this.childNodes = null;
}

module.exports = UtilityChildNodeContainer;