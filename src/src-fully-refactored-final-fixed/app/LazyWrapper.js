/**
 * @class LazyWrapper
 * @description
 *   Initializes a new LazyWrapper instance, which is used to wrap a value and
 *   store metadata for performing lazy evaluation of chained operations (such as map, filter, etc.).
 *   This is commonly used in functional libraries to enable efficient, composable data transformations.
 *
 * @param {any} value - The value to wrap for lazy evaluation (e.g., an array or collection).
 * @returns {LazyWrapper} a new LazyWrapper instance with initialized properties.
 */
function LazyWrapper(value) {
  /**
   * The wrapped value to be lazily evaluated.
   * @type {any}
   */
  this.__wrapped__ = value;

  /**
   * Stores the list of actions (transformations) to apply lazily.
   * @type {Array}
   */
  this.__actions__ = [];

  /**
   * The direction of iteration: 1 for left-to-right, -1 for right-to-left.
   * @type {number}
   */
  this.__dir__ = 1;

  /**
   * Indicates if a filter operation has been applied.
   * @type {boolean}
   */
  this.__filtered__ = false;

  /**
   * Stores iteratee functions (such as map, filter, etc.) to apply lazily.
   * @type {Array}
   */
  this.__iteratees__ = [];

  /**
   * The maximum number of values to take from the wrapped value.
   * @type {number}
   */
  this.__takeCount__ = Number.MAX_SAFE_INTEGER;

  /**
   * Stores view objects that describe slices of the wrapped value.
   * @type {Array}
   */
  this.__views__ = [];
}

module.exports = LazyWrapper;