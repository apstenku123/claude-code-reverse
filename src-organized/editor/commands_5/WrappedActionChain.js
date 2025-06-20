/**
 * @description
 * Initializes a new WrappedActionChain instance, which wraps a given value and sets up
 * properties for managing a chain of actions. This is typically used in functional
 * programming libraries to enable method chaining and lazy evaluation.
 *
 * @param {any} wrappedValue - The value to be wrapped and operated on.
 * @param {boolean} [enableChaining=false] - Whether to enable chaining for this instance.
 * @returns {void}
 */
function WrappedActionChain(wrappedValue, enableChaining) {
  /**
   * The value being wrapped for further operations.
   * @type {any}
   */
  this.__wrapped__ = wrappedValue;

  /**
   * The list of actions to be performed in the chain.
   * @type {Array}
   */
  this.__actions__ = [];

  /**
   * Indicates if chaining is enabled for this instance.
   * @type {boolean}
   */
  this.__chain__ = Boolean(enableChaining);

  /**
   * The current index in the chain of actions.
   * @type {number}
   */
  this.__index__ = 0;

  /**
   * Stores the source observable or value for processing (from dependency).
   * @type {any}
   */
  this.__values__ = processInteractionEntries;
}

module.exports = WrappedActionChain;