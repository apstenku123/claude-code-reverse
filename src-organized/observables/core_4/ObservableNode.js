/**
 * Represents a node in an observable chain, storing the observable function, configuration, and subscription value.
 *
 * @class ObservableNode
 * @param {Function} sourceObservable - The observable function or handler for this node.
 * @param {number} config - The configuration value, such as the length or priority for this node.
 * @param {any} subscription - The value or subscription associated with this node.
 */
function ObservableNode(sourceObservable, config, subscription) {
  /**
   * The observable function or handler for this node.
   * @type {Function}
   */
  this.fn = sourceObservable;

  /**
   * Configuration value, such as length or priority.
   * @type {number}
   */
  this.len = config;

  /**
   * Reference to the next node in the chain. Initialized as undefined.
   * @type {ObservableNode|undefined}
   */
  this.next = undefined;

  /**
   * The value or subscription associated with this node.
   * @type {any}
   */
  this.val = subscription;
}

module.exports = ObservableNode;
